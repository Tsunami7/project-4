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

class Match < ApplicationRecord
  

  validates :user1_id, presence: true
  validates :user2_id, presence: true
  
  belongs_to :user1,
    :class_name => "User",
    :foreign_key => :user1_id
    
  belongs_to :user2,
    :class_name => "User",
    :foreign_key => :user2_id

  has_many :comments

end
