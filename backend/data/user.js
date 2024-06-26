import bcrypt from 'bcryptjs';

const   users= [
    {
        name: "admin",
        emailId: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: "nani",
        emailId: 'nani@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false 
    },
    {
        name: "aatharav",
        emailId: 'aatharav@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false 
    }
]

export default users;