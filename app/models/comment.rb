class Comment < ApplicationRecord
  belongs_to :match
  belongs_to :user

  # todo 
  # remove post_comment from match
  # a match has many comments bitch


end
