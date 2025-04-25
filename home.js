
 // Function to toggle between light and dark themes

function toggleTheme() {
    document.documentElement.classList.toggle('dark-theme');
    if(document.documentElement.classList.contains('dark-theme')){
        localStorage.setItem('theme', 'dark');
    }    else{
        localStorage.setItem('item','light');
    }
}
function toggleWatermark() {
    const watermark = document.getElementById('watermark');
    watermark.style.display = (watermark.style.display === 'none') ? 'block' : 'none';
}
document.getElementById('theme-button').addEventListener('click', function() {
    const themeOptions = document.getElementById('theme-options');
    themeOptions.style.display = themeOptions.style.display === 'none' || themeOptions.style.display===' '? 'block' : 'none';
});
document.getElementById('toggle-theme-btn').addEventListener('click',toggleTheme);
document.getElementById('toggle-watermark-btn').addEventListener('click',toggleWatermark);

// Load the saved theme on page load
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.documentElement.classList.add("dark-theme");
}


document.getElementById('semester').addEventListener('change', function() {
    const semester = this.value;
    const subjectSelect = document.getElementById('subject');

    // Clear the current options
    subjectSelect.innerHTML = '';

    // Create a dictionary to map semester to subjects
    const subjectsBySemester = {
        '3': [
            { value: 'maths3', text: 'Mathematics III' },
            { value: 'dsa', text: 'Data Structures & Algorithms (DSA)' },
            { value: 'dbms', text: 'Database Management System (DBMS)' },
            { value: 'de', text: 'Digital Electronics (DE)' },
            { value: 'se', text: 'Software Engineering (SE)' },
            { value: 'hvpe', text: 'Human Values and Ethics (HVE)' },
        ],
        '4': [
            { value: 'maths4', text: 'Discrete Mathematics' },
            { value: 'oops', text: 'Object Oriented Programming Language(Java)' },
            { value: 'daa', text: 'Design and Analysis of Algorithms' },
            { value: 'co', text: 'Computer Organization' },
            { value: 'ee', text: 'Environmental & Ecology' },
            { value: 'im', text: 'Industrial Management' },
        ],
    };

    // Update the subject options based on the selected semester
    if (subjectsBySemester[semester]) {
        subjectsBySemester[semester].forEach(subject => {
            const option = document.createElement('option');
            option.value = subject.value;
            option.textContent = subject.text;
            subjectSelect.appendChild(option);
        });
    
    }
});


document.getElementById('search-button').addEventListener('click', function() {
    const branch = document.getElementById('branch').value;
    const semester = document.getElementById('semester').value;
    const subject = document.getElementById('subject').value;

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const result = data[branch]?.[semester]?.[subject];
            const resultsContainer = document.getElementById('results');
            if (result) {
                resultsContainer.innerHTML = `
                    <div class="result-item">
                        <h3>Results</h3>
                        <p><strong>Branch:</strong> ${branch.toUpperCase()}</p>
                        <p><strong>Semester:</strong> ${semester}</p>
                        <p><strong>Subject:</strong> ${subject.replace('_', ' ').toUpperCase()}</p>
                        <p>📘 Click <a href="${result.syllabus}" target="_blank">here</a> to view syllabus</p>
                        <p>📄 Click <a href="${result.question_papers}" target="_blank">here</a> to view question papers</p>
                    </div>
                `;
            } else {
                resultsContainer.innerHTML = '<p style="color: black;font-weight: bolder; font-size:20px;">Data will be updated soon...</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('results').innerHTML = '<p>There was an error fetching the data.</p>';
        });
});







