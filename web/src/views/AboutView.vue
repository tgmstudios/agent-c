<template>
  <section>
    <h1>About Me</h1>
    <p>I'm Aiden Johnson, a passionate Software Developer with a talent for blending technical innovation and teamwork to solve complex problems. My journey started with a simple fascination for technology and has grown into years of hands-on experience across full-stack development, RFID solutions, and cybersecurity infrastructure.

    I’m currently pursuing Computer Science at Penn State University, while balancing a multifaceted career at Telaeris, Inc. and leading technical initiatives for the Penn State Competitive Cybersecurity Organization. My professional highlights include leading large-scale RFID tracking projects, pioneering web solutions, and enhancing business-critical systems that streamline operations.

    When I’m not coding, I’m likely experimenting with machine learning, enhancing my containerization skills, or diving into tech competitions. From collaborating with geographically diverse teams to building products that impact daily lives, I thrive at the intersection of innovation and impact.</p>
  </section>

  <section>
    <h2>🛠 Key Projects & Roles:</h2>
    <ul>
      <li>
        <h3>🏢 Telaeris, Inc. (Apr 2024 – Present)</h3>
        <p><strong>Software Developer | San Diego, California</strong></p>
        <ul>
          <li>Lead developer for Tagaby, an RFID-based tracking solution for personal items. Built a comprehensive system integrating Node.js, MySQL, Flutter, and C# .NET Core.</li>
          <li>Spearheaded the OTA update server for Android devices, ensuring secure, reliable firmware distribution.</li>
          <li>Containerized all services using Docker and Kubernetes to ensure secure and scalable environments.</li>
          <li>Enhanced deployment pipelines with CI/CD using GitHub Actions for efficient releases.</li>
          <li>Collaborated with a diverse engineering team across time zones to drive project success.</li>
        </ul>
      </li>
      <li>
        <h3>🌐 Web Development & E-commerce Leadership</h3>
        <ul>
          <li><strong>Telaeris.com:</strong> Built and maintained the corporate website, collaborating with marketing, sales, and engineering teams.</li>
          <li><strong>XpressRFID.com:</strong> Developed a thriving RFID product web store, enhancing user experiences and fulfilling global orders.</li>
          <li><strong>Squarebrain.com:</strong> Converted a traditional in-person curriculum into a project-based online learning platform using PHP and WordPress.</li>
        </ul>
      </li>
      <li>
        <h3>🏆 Hackathon Success</h3>
        <ul>
          <li><strong>Perfect Portion (1st Place – HackPSU Fall 2023):</strong> An AI-powered nutrition app that identifies serving sizes from meal images.</li>
          <li><strong>Campus Calendar (2nd Place – HackPSU Spring 2024):</strong> A smart event-sorting platform providing AI-driven recommendations for student events.</li>
        </ul>
      </li>
      <li>
        <h3>🎓 Tech Director – Penn State Cybersecurity Organization (Mar 2024 – Present)</h3>
        <ul>
          <li>Managing the infrastructure for internal cybersecurity competitions, optimizing servers and Kubernetes clusters for performance and security.</li>
          <li>Leading the design and implementation of scalable, cloud-native solutions with a focus on automation and resilience.</li>
        </ul>
      </li>
    </ul>
  </section>
  <section>
    <h2>💻 Skills:</h2>
    <ul>
      <li><strong>Programming Languages:</strong> JavaScript, Node.js, Swift, PHP, C#, React.js</li>
      <li><strong>Cloud & DevOps:</strong> Docker, Kubernetes, AWS, GitHub Actions, Rancher</li>
      <li><strong>Database Management:</strong> MySQL, API Development, Access Control</li>
      <li><strong>RFID & IoT Solutions:</strong> PCB Design, KiCAD, Blender 3D modeling</li>
      <li><strong>AI & Machine Learning:</strong> Personal projects involving AI-driven applications</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "AboutView",
};
</script>

<style scoped>
section {
  padding: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 10px #2600ff;
  border: 1px solid #07002e;
  border-radius:20px;
  margin-bottom: 1em;
  color: #E5DED4;
}
ul {
  list-style-type: none;
  padding-inline-start: 0;
}
</style>
