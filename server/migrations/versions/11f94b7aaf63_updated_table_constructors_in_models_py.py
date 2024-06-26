"""updated table constructors in models.py

Revision ID: 11f94b7aaf63
Revises: 4f5ac151d111
Create Date: 2024-06-24 10:27:20.738373

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '11f94b7aaf63'
down_revision = '4f5ac151d111'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('accounts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_by', sa.Integer(), nullable=True))
        batch_op.drop_column('markup_variable')

    with op.batch_alter_table('configurations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True))
        batch_op.drop_column('ccreated_at')

    with op.batch_alter_table('customers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('address_1', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('address_2', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('city', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('state', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('zip_code', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('status', sa.String()))

    with op.batch_alter_table('quotes', schema=None) as batch_op:
        batch_op.alter_column('status',
               existing_type=sa.VARCHAR())

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_by', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('created_by')

    with op.batch_alter_table('quotes', schema=None) as batch_op:
        batch_op.alter_column('status',
               existing_type=sa.VARCHAR(),
               nullable=True)

    with op.batch_alter_table('customers', schema=None) as batch_op:
        batch_op.drop_column('status')
        batch_op.drop_column('zip_code')
        batch_op.drop_column('state')
        batch_op.drop_column('city')
        batch_op.drop_column('address_2')
        batch_op.drop_column('address_1')

    with op.batch_alter_table('configurations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('ccreated_at', sa.DATETIME(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True))
        batch_op.drop_column('created_at')

    with op.batch_alter_table('accounts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('markup_variable', sa.INTEGER(), nullable=True))
        batch_op.drop_column('created_by')

    # ### end Alembic commands ###