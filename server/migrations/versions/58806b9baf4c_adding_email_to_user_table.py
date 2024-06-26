"""adding email to User table

Revision ID: 58806b9baf4c
Revises: 38771a674d79
Create Date: 2024-05-21 09:40:08.611001

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '58806b9baf4c'
down_revision = '38771a674d79'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('_alembic_tmp_users')
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.String(), nullable=True))
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.drop_column('email')

    op.create_table('_alembic_tmp_users',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('first_name', sa.VARCHAR(), nullable=True),
    sa.Column('last_name', sa.VARCHAR(), nullable=True),
    sa.Column('username', sa.VARCHAR(), nullable=False),
    sa.Column('created_at', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('status', sa.BOOLEAN(), nullable=True),
    sa.Column('account_id', sa.VARCHAR(), nullable=True),
    sa.Column('_password_hash', sa.VARCHAR(), nullable=True),
    sa.Column('email', sa.VARCHAR(), nullable=False),
    sa.ForeignKeyConstraint(['account_id'], ['accounts.id'], name='fk_users_account_id_accounts'),
    sa.PrimaryKeyConstraint('id', name='pk_users'),
    sa.UniqueConstraint('email', name='uq_users_email'),
    sa.UniqueConstraint('username', name='uq_users_username')
    )
    # ### end Alembic commands ###
