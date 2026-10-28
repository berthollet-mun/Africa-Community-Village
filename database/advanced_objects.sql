-- ACV advanced MySQL/MariaDB objects.
-- Apply after the Prisma migrations with: npm run db:advanced

DROP VIEW IF EXISTS `view_active_banners`;
DROP VIEW IF EXISTS `view_published_articles`;
DROP VIEW IF EXISTS `view_team_directory`;

CREATE VIEW `view_active_banners` AS
SELECT
  b.`id`, b.`external_id`, b.`page_route`, b.`image_url`, b.`title_en`, b.`title_fr`,
  b.`subtitle_en`, b.`subtitle_fr`, b.`cta_text_en`, b.`cta_text_fr`, b.`cta_link`,
  b.`alt_text_en`, b.`alt_text_fr`, b.`order_index`, b.`start_date`, b.`end_date`
FROM `banners` b
WHERE b.`is_active` = TRUE
  AND (b.`start_date` IS NULL OR b.`start_date` <= CURRENT_TIMESTAMP(3))
  AND (b.`end_date` IS NULL OR b.`end_date` >= CURRENT_TIMESTAMP(3));

CREATE VIEW `view_published_articles` AS
SELECT
  a.`id`, a.`external_id`, a.`slug`, a.`title_en`, a.`title_fr`, a.`excerpt_en`, a.`excerpt_fr`,
  a.`content_en`, a.`content_fr`, a.`cover_image`, a.`author_name`, a.`category`, a.`read_time`,
  a.`is_featured`, a.`tags`, a.`views`, a.`published_at`, a.`created_at`, a.`updated_at`
FROM `articles` a
WHERE a.`status` = 'published' AND a.`deleted_at` IS NULL;

CREATE VIEW `view_team_directory` AS
SELECT
  t.`id`, t.`external_id`, t.`name`, t.`role_en`, t.`role_fr`, t.`bio_en`, t.`bio_fr`,
  t.`photo_url`, t.`category`, t.`social_links`, t.`status`, t.`order_index`, t.`created_at`, t.`updated_at`
FROM `team_members` t
WHERE t.`deleted_at` IS NULL AND t.`status` IN ('visible', 'active');

DROP FUNCTION IF EXISTS `fn_generate_slug`;
DROP FUNCTION IF EXISTS `fn_get_active_banners`;
DROP PROCEDURE IF EXISTS `sp_create_article`;
DROP PROCEDURE IF EXISTS `sp_get_dashboard_stats`;
DROP PROCEDURE IF EXISTS `sp_soft_delete_record`;
DROP TRIGGER IF EXISTS `trg_articles_before_insert`;
DROP TRIGGER IF EXISTS `trg_articles_before_update`;
DROP TRIGGER IF EXISTS `trg_articles_after_insert`;
DROP TRIGGER IF EXISTS `trg_articles_after_update`;
DROP TRIGGER IF EXISTS `trg_articles_after_delete`;
DROP TRIGGER IF EXISTS `trg_team_members_before_update`;
DROP TRIGGER IF EXISTS `trg_team_members_after_insert`;
DROP TRIGGER IF EXISTS `trg_team_members_after_update`;
DROP TRIGGER IF EXISTS `trg_team_members_after_delete`;

DELIMITER //

CREATE FUNCTION `fn_generate_slug`(p_value TEXT)
RETURNS VARCHAR(191)
DETERMINISTIC
NO SQL
BEGIN
  DECLARE v_slug VARCHAR(191);
  SET v_slug = LOWER(TRIM(COALESCE(p_value, '')));
  SET v_slug = REPLACE(v_slug, 'à', 'a');
  SET v_slug = REPLACE(v_slug, 'â', 'a');
  SET v_slug = REPLACE(v_slug, 'ä', 'a');
  SET v_slug = REPLACE(v_slug, 'ç', 'c');
  SET v_slug = REPLACE(v_slug, 'é', 'e');
  SET v_slug = REPLACE(v_slug, 'è', 'e');
  SET v_slug = REPLACE(v_slug, 'ê', 'e');
  SET v_slug = REPLACE(v_slug, 'ë', 'e');
  SET v_slug = REPLACE(v_slug, 'î', 'i');
  SET v_slug = REPLACE(v_slug, 'ï', 'i');
  SET v_slug = REPLACE(v_slug, 'ô', 'o');
  SET v_slug = REPLACE(v_slug, 'ö', 'o');
  SET v_slug = REPLACE(v_slug, 'ù', 'u');
  SET v_slug = REPLACE(v_slug, 'û', 'u');
  SET v_slug = REPLACE(v_slug, 'ü', 'u');
  SET v_slug = REGEXP_REPLACE(v_slug, '[^a-z0-9]+', '-');
  SET v_slug = TRIM(BOTH '-' FROM v_slug);
  RETURN LEFT(CASE WHEN v_slug = '' THEN REPLACE(UUID(), '-', '') ELSE v_slug END, 191);
END//

CREATE FUNCTION `fn_get_active_banners`(p_page_route VARCHAR(191))
RETURNS LONGTEXT
READS SQL DATA
BEGIN
  DECLARE v_result LONGTEXT;
  SELECT COALESCE(
    JSON_ARRAYAGG(JSON_OBJECT(
      'id', b.`external_id`,
      'pageRoute', b.`page_route`,
      'imageUrl', b.`image_url`,
      'titleEn', b.`title_en`,
      'titleFr', b.`title_fr`,
      'order', b.`order_index`
    )),
    JSON_ARRAY()
  ) INTO v_result
  FROM `view_active_banners` b
  WHERE p_page_route IS NULL OR p_page_route = '' OR b.`page_route` IN (p_page_route, 'all');
  RETURN v_result;
END//

CREATE PROCEDURE `sp_create_article`(
  IN p_title_en VARCHAR(255),
  IN p_title_fr VARCHAR(255),
  IN p_content_en LONGTEXT,
  IN p_content_fr LONGTEXT,
  IN p_category VARCHAR(100),
  IN p_status VARCHAR(32),
  IN p_author_id INT,
  IN p_author_name VARCHAR(191)
)
BEGIN
  DECLARE v_external_id VARCHAR(191) DEFAULT UUID();
  DECLARE v_slug VARCHAR(191);
  DECLARE v_suffix INT DEFAULT 1;
  DECLARE v_base_slug VARCHAR(191);

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    RESIGNAL;
  END;

  START TRANSACTION;
  SET v_base_slug = fn_generate_slug(p_title_en);
  SET v_slug = v_base_slug;
  WHILE EXISTS (SELECT 1 FROM `articles` WHERE `slug` = v_slug) DO
    SET v_suffix = v_suffix + 1;
    SET v_slug = CONCAT(LEFT(v_base_slug, 180), '-', v_suffix);
  END WHILE;

  INSERT INTO `articles` (
    `external_id`, `title_en`, `title_fr`, `slug`, `content_en`, `content_fr`, `author_id`,
    `author_name`, `category`, `status`, `published_at`, `created_at`, `updated_at`
  ) VALUES (
    v_external_id, p_title_en, p_title_fr, v_slug, p_content_en, p_content_fr, p_author_id,
    p_author_name, p_category, COALESCE(NULLIF(p_status, ''), 'draft'),
    CASE WHEN p_status = 'published' THEN CURRENT_TIMESTAMP(3) ELSE NULL END,
    CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
  );

  COMMIT;
  SELECT * FROM `articles` WHERE `external_id` = v_external_id;
END//

CREATE PROCEDURE `sp_get_dashboard_stats`()
READS SQL DATA
BEGIN
  SELECT
    (SELECT COUNT(*) FROM `pages`) AS `pages`,
    (SELECT COUNT(*) FROM `programs`) AS `programs`,
    (SELECT COUNT(*) FROM `articles` WHERE `deleted_at` IS NULL) AS `articles`,
    (SELECT COUNT(*) FROM `articles` WHERE `status` = 'published' AND `deleted_at` IS NULL) AS `published_articles`,
    (SELECT COUNT(*) FROM `team_members` WHERE `deleted_at` IS NULL) AS `team_members`,
    (SELECT COUNT(*) FROM `view_active_banners`) AS `active_banners`,
    (SELECT COUNT(*) FROM `partners` WHERE `status` = 'active') AS `active_partners`,
    (SELECT COUNT(*) FROM `contact_submissions` WHERE `is_read` = FALSE) AS `unread_messages`,
    (SELECT COUNT(*) FROM `donations` WHERE `status` IN ('completed', 'pledged')) AS `donations`,
    (SELECT COALESCE(SUM(`amount`), 0) FROM `donations` WHERE `status` = 'completed') AS `completed_donation_total`;
END//

CREATE PROCEDURE `sp_soft_delete_record`(
  IN p_table_name VARCHAR(64),
  IN p_external_id VARCHAR(191),
  IN p_actor_user_id INT
)
BEGIN
  DECLARE v_affected INT DEFAULT 0;
  SET @acv_actor_user_id = p_actor_user_id;

  START TRANSACTION;
  IF p_table_name = 'articles' THEN
    UPDATE `articles`
      SET `deleted_at` = CURRENT_TIMESTAMP(3), `updated_at` = CURRENT_TIMESTAMP(3)
      WHERE `external_id` = p_external_id AND `deleted_at` IS NULL;
    SET v_affected = ROW_COUNT();
  ELSEIF p_table_name = 'team_members' THEN
    UPDATE `team_members`
      SET `deleted_at` = CURRENT_TIMESTAMP(3), `updated_at` = CURRENT_TIMESTAMP(3)
      WHERE `external_id` = p_external_id AND `deleted_at` IS NULL;
    SET v_affected = ROW_COUNT();
  ELSE
    ROLLBACK;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unsupported table for soft deletion';
  END IF;
  COMMIT;
  SELECT v_affected AS `affected_rows`;
END//

CREATE TRIGGER `trg_articles_before_insert`
BEFORE INSERT ON `articles`
FOR EACH ROW
BEGIN
  IF NEW.`slug` IS NULL OR NEW.`slug` = '' THEN
    SET NEW.`slug` = fn_generate_slug(NEW.`title_en`);
  END IF;
  IF NEW.`external_id` IS NULL OR NEW.`external_id` = '' THEN
    SET NEW.`external_id` = UUID();
  END IF;
  IF NEW.`updated_at` IS NULL THEN
    SET NEW.`updated_at` = CURRENT_TIMESTAMP(3);
  END IF;
END//

CREATE TRIGGER `trg_articles_before_update`
BEFORE UPDATE ON `articles`
FOR EACH ROW
SET NEW.`updated_at` = CURRENT_TIMESTAMP(3)//

CREATE TRIGGER `trg_articles_after_insert`
AFTER INSERT ON `articles`
FOR EACH ROW
INSERT INTO `audit_logs` (`external_id`, `user_id`, `action`, `table_name`, `record_id`, `details`, `created_at`)
VALUES (UUID(), @acv_actor_user_id, 'create', 'articles', NEW.`external_id`, CONCAT('Article created: ', NEW.`title_en`), CURRENT_TIMESTAMP(3))//

CREATE TRIGGER `trg_articles_after_update`
AFTER UPDATE ON `articles`
FOR EACH ROW
INSERT INTO `audit_logs` (`external_id`, `user_id`, `action`, `table_name`, `record_id`, `details`, `created_at`)
VALUES (UUID(), @acv_actor_user_id, IF(OLD.`deleted_at` IS NULL AND NEW.`deleted_at` IS NOT NULL, 'delete', 'update'),
  'articles', NEW.`external_id`, CONCAT('Article updated: ', NEW.`title_en`), CURRENT_TIMESTAMP(3))//

CREATE TRIGGER `trg_articles_after_delete`
AFTER DELETE ON `articles`
FOR EACH ROW
INSERT INTO `audit_logs` (`external_id`, `user_id`, `action`, `table_name`, `record_id`, `details`, `created_at`)
VALUES (UUID(), @acv_actor_user_id, 'delete', 'articles', OLD.`external_id`, CONCAT('Article deleted: ', OLD.`title_en`), CURRENT_TIMESTAMP(3))//

CREATE TRIGGER `trg_team_members_before_update`
BEFORE UPDATE ON `team_members`
FOR EACH ROW
SET NEW.`updated_at` = CURRENT_TIMESTAMP(3)//

CREATE TRIGGER `trg_team_members_after_insert`
AFTER INSERT ON `team_members`
FOR EACH ROW
INSERT INTO `audit_logs` (`external_id`, `user_id`, `action`, `table_name`, `record_id`, `details`, `created_at`)
VALUES (UUID(), @acv_actor_user_id, 'create', 'team_members', NEW.`external_id`, CONCAT('Team member created: ', NEW.`name`), CURRENT_TIMESTAMP(3))//

CREATE TRIGGER `trg_team_members_after_update`
AFTER UPDATE ON `team_members`
FOR EACH ROW
INSERT INTO `audit_logs` (`external_id`, `user_id`, `action`, `table_name`, `record_id`, `details`, `created_at`)
VALUES (UUID(), @acv_actor_user_id, IF(OLD.`deleted_at` IS NULL AND NEW.`deleted_at` IS NOT NULL, 'delete', 'update'),
  'team_members', NEW.`external_id`, CONCAT('Team member updated: ', NEW.`name`), CURRENT_TIMESTAMP(3))//

CREATE TRIGGER `trg_team_members_after_delete`
AFTER DELETE ON `team_members`
FOR EACH ROW
INSERT INTO `audit_logs` (`external_id`, `user_id`, `action`, `table_name`, `record_id`, `details`, `created_at`)
VALUES (UUID(), @acv_actor_user_id, 'delete', 'team_members', OLD.`external_id`, CONCAT('Team member deleted: ', OLD.`name`), CURRENT_TIMESTAMP(3))//

DELIMITER ;
