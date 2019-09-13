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

  validates :social_url, presence: true
  validates :image_link, presence: true
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password,
            length: { minimum: 6 },
            if: -> { new_record? || !password.nil? }

  

end
