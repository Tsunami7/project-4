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

require 'test_helper'

class MatchTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
