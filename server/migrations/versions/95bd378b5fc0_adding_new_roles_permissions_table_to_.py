"""adding new roles_permissions table to account for user submittable attributes

Revision ID: 95bd378b5fc0
Revises: b312318a9f94
Create Date: 2024-06-13 14:42:04.582397

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '95bd378b5fc0'
down_revision = 'b312318a9f94'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('roles_permissions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('role_id', sa.Integer(), nullable=True),
    sa.Column('permission_id', sa.Integer(), nullable=True),
    sa.Column('granted_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('expires_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP + 24)'), nullable=True),
    sa.ForeignKeyConstraint(['permission_id'], ['permissions.id'], name=op.f('fk_roles_permissions_permission_id_permissions')),
    sa.ForeignKeyConstraint(['role_id'], ['roles.id'], name=op.f('fk_roles_permissions_role_id_roles')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_roles_permissions'))
    )
    op.drop_table('role_permissions')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('role_permissions',
    sa.Column('role_id', sa.INTEGER(), nullable=False),
    sa.Column('permission_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['permission_id'], ['permissions.id'], name='fk_role_permissions_permission_id_permissions'),
    sa.ForeignKeyConstraint(['role_id'], ['roles.id'], name='fk_role_permissions_role_id_roles'),
    sa.PrimaryKeyConstraint('role_id', 'permission_id', name='pk_role_permissions')
    )
    op.drop_table('roles_permissions')
    # ### end Alembic commands ###
