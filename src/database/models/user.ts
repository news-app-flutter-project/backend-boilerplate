import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface User extends TimeStampModel {
        id: number;
        nickname: string;
        email: string;
        password: string;
        profileImg: string;
        isDarkModeEnabled: boolean;
    }

    type UserCreateInterface = Omit<
        User,
        'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >;

    type UserGetInterface = Omit<User, 'name' | 'email'>;
}

export class UserModel
    extends Model<User, UserCreateInterface>
    implements User
{
    public id!: number;
    public nickname!: string; // Changed from name to nickname
    public email!: string;
    public password!: string;
    public profileImg!: string;
    public isDarkModeEnabled!: boolean;
    public neighborId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const UserGenerator = (sequelize: Sequelize): typeof UserModel => {
    UserModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            nickname: {
                // Changed from name to nickname
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            profileImg: {
                type: DataTypes.STRING,
                allowNull: true, // Making it optional
            },
            isDarkModeEnabled: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false, // Assuming a default value of false
            },
        },
        {
            sequelize,
            tableName: 'users',
            timestamps: true,
        },
    );
    return UserModel;
};
