"""adding total_cost to Quote Table

Revision ID: b312318a9f94
Revises: ecdfcc6a2444
Create Date: 2024-06-13 11:30:19.465624

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b312318a9f94'
down_revision = 'ecdfcc6a2444'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('quotes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('total_cost', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('quotes', schema=None) as batch_op:
        batch_op.drop_column('total_cost')

    # ### end Alembic commands ###
