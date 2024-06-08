function loadHeader() {
    const headerHTML = `
        <header>
            <h1>Md. Minhazul Islam</h1>
            <nav>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="publications.html">Publications</a></li>
                    <li><a href="research.html">Research</a></li>
                    <li><a href="experience.html">Experience</a></li>
                    <li><a href="teaching.html">Teaching & Services</a></li>
                    <li><a href="awards.html">Awards</a></li>
                    <li><a href="cv.html">CV</a></li>
                </ul>
            </nav>
        </header>
    `;
    document.getElementById('header').innerHTML = headerHTML;
}

document.addEventListener("DOMContentLoaded", loadHeader);
