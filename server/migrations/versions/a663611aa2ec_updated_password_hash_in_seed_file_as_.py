"""updated password_hash in seed file as well as constraints on length

Revision ID: a663611aa2ec
Revises: dbe6de112d26
Create Date: 2024-05-16 14:42:45.819243

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a663611aa2ec'
down_revision = 'dbe6de112d26'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.create_unique_constraint(batch_op.f('uq_users_username'), ['username'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('uq_users_username'), type_='unique')
        batch_op.alter_column('_password_hash',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # ### end Alembic commands ###
