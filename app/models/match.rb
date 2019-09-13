# == Schema Information
#
# Table name: matches
#
#  id           :bigint           not null, primary key
#  post_comment :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user2_id     :integer
#  user1_id     :integer
#

# TODO
# migrate user_id to user1_id
# migrate add column user2_id
# belongs_to :user1
# :class_name => "User,
# :foreign_key => “user1_id”,
# belongs_to :user2
# :class_name => "User,
# :foreign_key => “user2_id”,

class Match < ApplicationRecord
  
  # validates :user_id, presence: true
  # belongs_to :user

  validates :user1_id, presence: true
  validates :user2_id, presence: true
  
  belongs_to :user1,
    :class_name => "User",
    :foreign_key => :user1_id
    
  belongs_to :user2,
    :class_name => "User",
    :foreign_key => :user2_id

  #belongs_to :name_of_association
  # { foreign_key: :foreign_keys_column,
  #   class_name: :ClassName }


end
