import { contentModel } from '@/models/contentModel';

type AuditAction = 'create' | 'update' | 'delete' | 'login' | 'upload' | 'status_change';

export interface AuditActor {
  userName: string;
  userEmail: string;
}

export async function logAuditAction(
  actor: AuditActor,
  action: AuditAction,
  entity: string,
  details: string,
  entityId?: string,
  ipAddress?: string
) {
  return contentModel.create('auditLogs', {
    ...actor,
    action,
    entity,
    entityId,
    details,
    timestamp: new Date().toISOString(),
    ipAddress
  });
}
