document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.toggle-button');
    const navbarLinks = document.querySelector('.navbar-links');

    toggleButton.addEventListener('click', () => {
        // navbarLinks.classList.toggle('active');
        navbarLinks.classList.toggle('show');
        toggleButton.classList.toggle('active');
    });

    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-link');
    console.log(currentPage);
    navLinks.forEach(link => {
        console.log(link);
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('current');
        }
    });
});

const lastModifiedElement = document.getElementById('lastModified');
const lastModifiedDate = document.lastModified;
lastModifiedElement.innerHTML = `Last Update: ${lastModifiedDate}`;

const currentDate = new Date();
const year = currentDate.getFullYear();

document.getElementById("currentYear").textContent = ` ${year}`;

const courses = [{
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

function filterCourses(filter) {
    const courseList = document.getElementById('courseList');

    courseList.style.height = '0px';
    courseList.innerHTML = '';
    let courseListHeight = 0;

    const filteredCourses = filter === 'all' ? courses : courses.filter(course => course.subject === filter);
    const totalCredits = filteredCourses.reduce((total, course) => total + course.credits, 0);

    setTimeout(() => {
        filteredCourses.forEach(course => {
            courseListHeight += 2;
            const courseItem = document.createElement('div');
            courseItem.classList.add(course.completed ? 'completed' : 'not-completed');
            courseItem.innerHTML = `${course.subject} ${course.number}`;
            courseList.appendChild(courseItem);
        });

        const newHeight = courseListHeight;
        console.log(newHeight);
        courseList.style.height = `${newHeight}rem`;
        document.getElementById("credits").innerText = `Total Credits: ${totalCredits}`;
    }, 0);
}

filterCourses('all');