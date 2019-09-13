# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create( username: 'me', email: 'me@me.com', password: '123456', image_link: 'image_link.com', social_url: 'social_link.com' )
user2 = User.create( username: 'me2', email: 'me2@me.com', password: '1234562', image_link: 'image_link.com', social_url: 'social_link2.com' )

Match.create( post_comment: 'something', user1_id: user1.id, user2_id: user2.id)