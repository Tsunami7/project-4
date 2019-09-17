# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string
#  email           :string
#  password_digest :string
#  image_link      :string
#  social_url      :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  has_secure_password

  # has_many :matches
  def matches 
    Match.where("user1_id = ? OR user2_id = ?", self.id, self.id)
  end

  # so once it is generate a random user then 
  # so then once it accepts then hit that controller then set then in the match table
  # then hit the random post action in th controller
  # which will create a new match
  def self.random
    User.find(User.pluck(:id).sample)
  end

  def as_json(options = {})
    super(options.merge({ except: [:password_digest] }))
  end

  validates :social_url, presence: true
  validates :image_link, presence: true
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password,
            length: { minimum: 6 },
            if: -> { new_record? || !password.nil? }

  

end
# a user has one match
# and the match table has 
# attach http://localhost:3000/matches/random
# then bind 
# 
# 