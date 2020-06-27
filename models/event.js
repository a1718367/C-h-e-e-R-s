module.exports = function(sequelize, DataType){
    const Event = sequelize.define("Event",{
    eventname:{
        type:DataType.STRING,
        allowNull: false,
        validate: {
            len: [3,100]
            }
        },

    time:{
        type:DataType.STRING,
        allowNull: false,
        },

    date:{
        type:DataType.STRING,
        allowNull: false,

        },
    capacity: {
        type: DataType.NUMERIC,
        allowNull: false
        },

    current:{
        type: DataType.BOOLEAN,
        defaultValue: true
        },
    desc:{
        type: DataType.STRING,
        allowNull: false,
        validate:{
            len:[10,100]
        }
    }
    
    
    
    });


    // Event.associate = function(models){
    //     Event.hasMany(models.Booking,{
    //         onDelete: "cascade"
    //     });
    // };
    // Event.associate = function(models){
    //     Event.belongsTo(models.Wineries,{
    //         foreignKey:{
    //             allowNull: false
    //         }
    //     });
    // };
    
    Event.associate = function (models) {
        Event.hasMany(models.Booking);
        // Event.belongsToMany(models.User, {
        //         through: 'Bookings',
        //         as: 'Users',
        //         foreignKey: {
        //             allowNull: false
        //         },
        //         otherKey: "UserID"
        //     }),
            Event.belongsTo(models.Wineries, {
                foreignKey: {
                    allowNull: false
                }
            });
    };
    

    return Event
};