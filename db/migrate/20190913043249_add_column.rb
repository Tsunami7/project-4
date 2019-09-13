class AddColumn < ActiveRecord::Migration[6.0]
  def change
  # add_column :table_name, :column_name, :type
    add_column :matches, :user2_id, :integer
    remove_column :matches, :user_id, :integer
    add_column :matches, :user1_id, :integer
  end
end
