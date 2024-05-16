"""added status to accounts table

Revision ID: 38771a674d79
Revises: a663611aa2ec
Create Date: 2024-05-16 15:39:35.542572

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '38771a674d79'
down_revision = 'a663611aa2ec'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('_alembic_tmp_users')
    with op.batch_alter_table('accounts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('status', sa.Boolean(), nullable=True))
        batch_op.alter_column('account_number',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('company_name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.create_unique_constraint(batch_op.f('uq_accounts_account_number'), ['account_number'])
        batch_op.create_unique_constraint(batch_op.f('uq_accounts_company_name'), ['company_name'])

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
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(),
               nullable=True)

    with op.batch_alter_table('accounts', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('uq_accounts_company_name'), type_='unique')
        batch_op.drop_constraint(batch_op.f('uq_accounts_account_number'), type_='unique')
        batch_op.alter_column('company_name',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('account_number',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.drop_column('status')

    op.create_table('_alembic_tmp_users',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('first_name', sa.VARCHAR(), nullable=False),
    sa.Column('last_name', sa.VARCHAR(), nullable=False),
    sa.Column('username', sa.VARCHAR(), nullable=False),
    sa.Column('created_at', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('status', sa.BOOLEAN(), nullable=True),
    sa.Column('account_id', sa.VARCHAR(), nullable=True),
    sa.Column('_password_hash', sa.VARCHAR(), nullable=False),
    sa.ForeignKeyConstraint(['account_id'], ['accounts.id'], name='fk_users_account_id_accounts'),
    sa.PrimaryKeyConstraint('id', name='pk_users'),
    sa.UniqueConstraint('username', name='uq_users_username')
    )
    # ### end Alembic commands ###
