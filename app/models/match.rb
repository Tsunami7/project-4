# == Schema Information
#
# Table name: matches
#
#  id           :bigint           not null, primary key
#  post_comment :string
#  user_id      :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
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
  
  validates :user_id, presence: true
  belongs_to :user
end
