export const config = {
    project: {
        name: 'IT Mastery School',
        slogan: "Empowering Minds, Unleashing Tech: Where IT Dreams Take Flight!",
        description: 'Unlock the Future of Technology at Our IT School: Discover Cutting-Edge Courses, Hands-on Training, and Expert Guidance. Join Today for a Thriving Tech Career!',
        version: '1.0.0',
    },
    contact:{
        phone1: "+1 (315) 686-8284",
        phone2: "+1 (315) 686-828",
        email: "info@itmasteryschool.com",
        address: "196 Bleecker St, New York, NY 10012, USA",
        website: "https://itmasteryschool.com",
        mapURL: "https://goo.gl/maps/aekRiJbXVYuqVMxp7",
        mapEmbedURL: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3023.490731046204!2d-74.00457492439138!3d40.72922623656155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDQzJzQ1LjIiTiA3NMKwMDAnMDcuMiJX!5e0!3m2!1sen!2sgr!4v1691050244325!5m2!1sen!2sgr",
        socialMedia: {
            twitter: "https://twitter.com",
            facebook: "https://facebook.com",
            instagram: "https://instagram.com",
            linkedin: "https://linkedin.com",
            youtube: "https://youtube.com",
        }, 
    },
    api: {
        baseUrl: 'https://mycampusmates.com/app',
    },
    pageRoles:{
        dashboard: ["ADMIN", "MANAGER", "ASSISTANTMANAGER", "TEACHER", "STUDENT"],
        adminManagement: ["ADMIN"],
        managerManagement: ["ADMIN"],
        assistantManagerManagement:["ADMIN", "MANAGER"],
        teacherManagement: ["ADMIN", "ASSISTANTMANAGER" ],
        lessonManagement : ["ADMIN", "ASSISTANTMANAGER" ],
        studentManagement: ["ADMIN", "ASSISTANTMANAGER" ],
        studentInfoManagement: ["TEACHER"],
        meetManagement: ["TEACHER"],
        chooseLesson: ["STUDENT"],
        gradesAndMeets: ["STUDENT"],

    },
    educationTerms: [
        {label: "Fall", key:"FALL_SEMESTER"},
        {label: "Spring", key:"SPRING_SEMESTER"},
    ],
    days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
    
    
}