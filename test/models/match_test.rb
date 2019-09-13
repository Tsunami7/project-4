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

require 'test_helper'

class MatchTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
