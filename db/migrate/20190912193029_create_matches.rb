class CreateMatches < ActiveRecord::Migration[6.0]
  def change
    create_table :matches do |t|
      t.string :post_comment
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
