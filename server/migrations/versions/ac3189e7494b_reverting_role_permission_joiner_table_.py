"""reverting role_permission joiner table in attempt to popluate role and permission data

Revision ID: ac3189e7494b
Revises: 2e25072f8e78
Create Date: 2024-06-03 11:40:17.668013

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ac3189e7494b'
down_revision = '2e25072f8e78'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('permissions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_permissions'))
    )
    op.create_table('roles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_roles'))
    )
    with op.batch_alter_table('accounts', schema=None) as batch_op:
        batch_op.alter_column('status',
               existing_type=sa.BOOLEAN(),
               type_=sa.String(),
               nullable=False)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('role_id', sa.Integer(), nullable=True))
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('status',
               existing_type=sa.BOOLEAN(),
               type_=sa.String(),
               nullable=False)
        batch_op.alter_column('account_id',
               existing_type=sa.VARCHAR(),
               type_=sa.Integer(),
               existing_nullable=True)
        batch_op.create_foreign_key(batch_op.f('fk_users_role_id_roles'), 'roles', ['role_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_users_role_id_roles'), type_='foreignkey')
        batch_op.alter_column('account_id',
               existing_type=sa.Integer(),
               type_=sa.VARCHAR(),
               existing_nullable=True)
        batch_op.alter_column('status',
               existing_type=sa.String(),
               type_=sa.BOOLEAN(),
               nullable=True)
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.drop_column('role_id')

    with op.batch_alter_table('accounts', schema=None) as batch_op:
        batch_op.alter_column('status',
               existing_type=sa.String(),
               type_=sa.BOOLEAN(),
               nullable=True)

    op.drop_table('roles')
    op.drop_table('permissions')
    # ### end Alembic commands ###
