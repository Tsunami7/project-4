# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create( username: 'test', email: 'test@mail.com', password: '123456', image_link: 'https://the-drive-2.imgix.net/https%3A%2F%2Fapi.thedrive.com%2Fwp-content%2Fuploads%2F2018%2F10%2Fmiata-hero-new.jpg%3Fquality%3D85?w=1440&auto=compress%2Cformat&ixlib=js-1.4.1&s=4ec9c0ec196e0da95794d8359b3af18f', social_url: 'https://www.mazdausa.com/' )
user2 = User.create( username: 'AlexThompson', email: 'alexthompson2@mail.com', password: '1234562', image_link: 'https://i.ytimg.com/vi/KC6YwhXSW3w/maxresdefault.jpg', social_url: 'https://www.toyota.com/' )
user3 = User.create( username: 'TrevorGollaher', email: 'trevorgollaher2@mail.com', password: '1234562', image_link: 'https://www.crowngarage.co.uk/media/01DSCN9823.JPG', social_url: 'https://automobiles.honda.com/' )
user4 = User.create( username: 'LorianaHines', email: 'lorianahines@mail.com', password: '1234562', image_link: 'https://cdn.vox-cdn.com/thumbor/VZs30v4OenkbH-MVLtLXhhr4p34=/0x0:2040x1360/1200x800/filters:focal(857x517:1183x843)/cdn.vox-cdn.com/uploads/chorus_image/image/58922143/20180306_volvov60_vladsavov12.0.jpg', social_url: 'https://www.volvocars.com/us' )
user5 = User.create( username: 'BenRosner', email: 'benrosner@mail.com', password: '1234562', image_link: 'https://www.automotiveaddicts.com/wp-content/uploads/2015/10/2015-mercedes-benz-gla45-amg.jpg', social_url: 'https://www.mbusa.com/en/home' )
user6 = User.create( username: 'DavidGrosh', email: 'davidgrosh@mail.com', password: '1234562', image_link: 'https://cdn.bringatrailer.com/wp-content/uploads/2019/01/2018_mercedes-amg_gt_c_edition_50_15481716280dec12aGT-134-940x564.jpg', social_url: 'https://www.mbusa.com/en/home' )
user7 = User.create( username: 'JosephCillo', email: 'josephcillo@mail.com', password: '1234562', image_link: 'https://static.carthrottle.com/workspace/uploads/posts/2016/06/12074d785327b9efc60807da1c89d286.jpg', social_url: 'https://www.audiusa.com/' )
user8 = User.create( username: 'PhilMa', email: 'philma@mail.com', password: '1234562', image_link: 'https://upload.wikimedia.org/wikipedia/commons/6/61/2019_Toyota_Prius_%28ZVW50R%29_1.8_Hybrid_liftback_%282018-12-19%29_01.jpg', social_url: 'https://www.toyota.com/' )
user9 = User.create( username: 'TylerGurman', email: 'tylergurman@mail.com', password: '1234562', image_link: 'https://pbs.twimg.com/media/DxN_8FhXgAApd7G.jpg', social_url: 'https://www.audiusa.com/' )
user10 = User.create( username: 'MattSeech', email: 'mattseech@mail.com', password: '1234562', image_link: 'https://i.pinimg.com/originals/e6/7f/77/e67f7754ea025268296e9539e3b869ef.jpg', social_url: 'https://www.bmwusa.com/' )

Match.create( post_comment: 'click me to edit please ', user1_id: user1.id, user2_id: user2.id)
Match.create( post_comment: 'click me to edit please 2 ', user1_id: user1.id, user2_id: user2.id)
Match.create( post_comment: 'click me to edit please 3', user1_id: user1.id, user2_id: user2.id)
Match.create( post_comment: 'click me to edit please 4', user1_id: user1.id, user2_id: user2.id)
Match.create( post_comment: 'click me to edit please 5', user1_id: user1.id, user2_id: user2.id)

