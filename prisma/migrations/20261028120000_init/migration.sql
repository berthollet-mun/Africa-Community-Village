-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` VARCHAR(32) NOT NULL DEFAULT 'editor',
    `status` VARCHAR(32) NOT NULL DEFAULT 'active',
    `avatar` TEXT NULL,
    `last_login` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_external_id_key`(`external_id`),
    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_role_status_idx`(`role`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` VARCHAR(191) NOT NULL,
    `route` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title_en` VARCHAR(255) NOT NULL,
    `title_fr` VARCHAR(255) NOT NULL,
    `subtitle_en` TEXT NULL,
    `subtitle_fr` TEXT NULL,
    `content_en` LONGTEXT NULL,
    `content_fr` LONGTEXT NULL,
    `cover_image` TEXT NULL,
    `seo_meta` JSON NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'draft',
    `order_index` INTEGER NOT NULL DEFAULT 0,
    `data` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `pages_external_id_key`(`external_id`),
    UNIQUE INDEX `pages_route_key`(`route`),
    UNIQUE INDEX `pages_slug_key`(`slug`),
    INDEX `pages_status_order_index_idx`(`status`, `order_index`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `banners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` VARCHAR(191) NOT NULL,
    `page_id` INTEGER NULL,
    `page_route` VARCHAR(191) NOT NULL,
    `image_url` TEXT NOT NULL,
    `title_en` VARCHAR(255) NOT NULL,
    `title_fr` VARCHAR(255) NOT NULL,
    `subtitle_en` TEXT NULL,
    `subtitle_fr` TEXT NULL,
    `cta_text_en` VARCHAR(191) NULL,
    `cta_text_fr` VARCHAR(191) NULL,
    `cta_link` TEXT NULL,
    `alt_text_en` VARCHAR(255) NULL,
    `alt_text_fr` VARCHAR(255) NULL,
    `order_index` INTEGER NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `data` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `banners_external_id_key`(`external_id`),
    INDEX `banners_page_id_is_active_order_index_idx`(`page_id`, `is_active`, `order_index`),
    INDEX `banners_page_route_is_active_idx`(`page_route`, `is_active`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `programs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title_en` VARCHAR(255) NOT NULL,
    `title_fr` VARCHAR(255) NOT NULL,
    `description_en` LONGTEXT NULL,
    `description_fr` LONGTEXT NULL,
    `icon` VARCHAR(100) NULL,
    `image_url` TEXT NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'draft',
    `order_index` INTEGER NOT NULL DEFAULT 0,
    `metrics` JSON NULL,
    `objectives_en` JSON NULL,
    `objectives_fr` JSON NULL,
    `gallery` JSON NULL,
    `data` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `programs_external_id_key`(`external_id`),
    UNIQUE INDEX `programs_slug_key`(`slug`),
    INDEX `programs_status_order_index_idx`(`status`, `order_index`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_members` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role_en` VARCHAR(255) NOT NULL,
    `role_fr` VARCHAR(255) NOT NULL,
    `bio_en` LONGTEXT NULL,
    `bio_fr` LONGTEXT NULL,
    `photo_url` TEXT NULL,
    `category` VARCHAR(64) NOT NULL DEFAULT 'Staff',
    `social_links` JSON NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'visible',
    `order_index` INTEGER NOT NULL DEFAULT 0,
    `data` JSON NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `team_members_external_id_key`(`external_id`),
    INDEX `team_members_category_status_order_index_idx`(`category`, `status`, `order_index`),
    INDEX `team_members_deleted_at_idx`(`deleted_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` VARCHAR(191) NOT NULL,
    `title_en` VARCHAR(255) NOT NULL,
    `title_fr` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `excerpt_en` TEXT NULL,
    `excerpt_fr` TEXT NULL,
    `content_en` LONGTEXT NOT NULL,
    `content_fr` LONGTEXT NOT NULL,
    `cover_image` TEXT NULL,
    `author_id` INTEGER NULL,
    `author_name` VARCHAR(191) NULL,
    `category` VARCHAR(100) NOT NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'draft',
    `read_time` VARCHAR(50) NULL,
    `is_featured` BOOLEAN NOT NULL DEFAULT false,
    `tags` JSON NULL,
    `views` INTEGER NOT NULL DEFAULT 0,
    `published_at` DATETIME(3) NULL,
    `data` JSON NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `articles_external_id_key`(`external_id`),
    UNIQUE INDEX `articles_slug_key`(`slug`),
    INDEX `articles_status_published_at_idx`(`status`, `published_at`),
    INDEX `articles_category_status_idx`(`category`, `status`),
    INDEX `articles_author_id_idx`(`author_id`),
    INDEX `articles_deleted_at_idx`(`deleted_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `file_name` VARCHAR(255) NOT NULL,
    `file_url` TEXT NOT NULL,
    `file_type` VARCHAR(50) NOT NULL,
    `mime_type` VARCHAR(100) NULL,
    `file_size` BIGINT NOT NULL DEFAULT 0,
    `alt_text_en` VARCHAR(255) NULL,
    `alt_text_fr` VARCHAR(255) NULL,
    `uploaded_by` INTEGER NULL,
    `data` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `media_external_id_key`(`external_id`),
    INDEX `media_file_type_created_at_idx`(`file_type`, `created_at`),
    INDEX `media_uploaded_by_idx`(`uploaded_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `partners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `logo_url` TEXT NULL,
    `website_url` TEXT NULL,
    `description_en` TEXT NULL,
    `description_fr` TEXT NULL,
    `type` VARCHAR(64) NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'active',
    `order_index` INTEGER NOT NULL DEFAULT 0,
    `data` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `partners_external_id_key`(`external_id`),
    INDEX `partners_status_order_index_idx`(`status`, `order_index`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `setting_key` VARCHAR(191) NOT NULL,
    `setting_value` JSON NOT NULL,
    `group_name` VARCHAR(64) NOT NULL DEFAULT 'general',
    `is_public` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `settings_setting_key_key`(`setting_key`),
    INDEX `settings_group_name_is_public_idx`(`group_name`, `is_public`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NULL,
    `user_name` VARCHAR(191) NULL,
    `user_email` VARCHAR(191) NULL,
    `action` VARCHAR(64) NOT NULL,
    `table_name` VARCHAR(64) NOT NULL,
    `record_id` VARCHAR(191) NULL,
    `details` TEXT NULL,
    `ip_address` VARCHAR(64) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `audit_logs_external_id_key`(`external_id`),
    INDEX `audit_logs_user_id_created_at_idx`(`user_id`, `created_at`),
    INDEX `audit_logs_table_name_record_id_idx`(`table_name`, `record_id`),
    INDEX `audit_logs_action_created_at_idx`(`action`, `created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` VARCHAR(191) NOT NULL,
    `donor_name` VARCHAR(191) NULL,
    `donor_email` VARCHAR(191) NULL,
    `donor_type` VARCHAR(64) NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `currency` CHAR(3) NOT NULL DEFAULT 'USD',
    `frequency` VARCHAR(32) NOT NULL DEFAULT 'one-time',
    `pillar_allocation` VARCHAR(191) NULL,
    `payment_method` VARCHAR(100) NULL,
    `is_anonymous` BOOLEAN NOT NULL DEFAULT false,
    `status` VARCHAR(32) NOT NULL DEFAULT 'pledged',
    `notes` TEXT NULL,
    `donated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `donations_external_id_key`(`external_id`),
    INDEX `donations_status_donated_at_idx`(`status`, `donated_at`),
    INDEX `donations_donor_email_idx`(`donor_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_submissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(64) NULL,
    `category` VARCHAR(100) NULL,
    `subject` VARCHAR(255) NULL,
    `message` LONGTEXT NOT NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'new',
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `data` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `contact_submissions_external_id_key`(`external_id`),
    INDEX `contact_submissions_status_is_read_created_at_idx`(`status`, `is_read`, `created_at`),
    INDEX `contact_submissions_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testimonials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` VARCHAR(191) NOT NULL,
    `quote_en` TEXT NOT NULL,
    `quote_fr` TEXT NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `role_en` VARCHAR(191) NULL,
    `role_fr` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `photo_url` TEXT NULL,
    `program_slug` VARCHAR(191) NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'visible',
    `order_index` INTEGER NOT NULL DEFAULT 0,
    `data` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `testimonials_external_id_key`(`external_id`),
    INDEX `testimonials_status_order_index_idx`(`status`, `order_index`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `impact_stats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` VARCHAR(191) NOT NULL,
    `label_en` VARCHAR(255) NOT NULL,
    `label_fr` VARCHAR(255) NOT NULL,
    `value` VARCHAR(100) NOT NULL,
    `unit` VARCHAR(50) NULL,
    `icon_name` VARCHAR(100) NULL,
    `display_page` VARCHAR(191) NOT NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'active',
    `order_index` INTEGER NOT NULL DEFAULT 0,
    `data` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `impact_stats_external_id_key`(`external_id`),
    INDEX `impact_stats_display_page_status_order_index_idx`(`display_page`, `status`, `order_index`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `policy_documents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` VARCHAR(191) NOT NULL,
    `title_en` VARCHAR(255) NOT NULL,
    `title_fr` VARCHAR(255) NOT NULL,
    `content_en` LONGTEXT NOT NULL,
    `content_fr` LONGTEXT NOT NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'published',
    `data` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `policy_documents_external_id_key`(`external_id`),
    INDEX `policy_documents_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `field_notes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `external_id` VARCHAR(191) NOT NULL,
    `title_en` VARCHAR(255) NOT NULL,
    `title_fr` VARCHAR(255) NOT NULL,
    `caption_en` TEXT NULL,
    `caption_fr` TEXT NULL,
    `location` VARCHAR(191) NULL,
    `pillar` VARCHAR(100) NULL,
    `note_date` DATETIME(3) NOT NULL,
    `status` VARCHAR(32) NOT NULL DEFAULT 'published',
    `data` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `field_notes_external_id_key`(`external_id`),
    INDEX `field_notes_status_note_date_idx`(`status`, `note_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `banners` ADD CONSTRAINT `banners_page_id_fkey` FOREIGN KEY (`page_id`) REFERENCES `pages`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media` ADD CONSTRAINT `media_uploaded_by_fkey` FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
