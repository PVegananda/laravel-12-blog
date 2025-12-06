<!-- ============================================= -->
<!-- ==========   DEARETNA BLOG STARTER   ========= -->
<!-- ============================================= -->

<div align="center" style="padding: 24px 16px; border-radius: 16px; border: 1px solid #e5e7eb; background: linear-gradient(135deg,#0A1A2F,#111827); color: #f9fafb; margin-bottom: 32px;">

  <h1 style="margin: 0 0 8px; font-size: 36px; font-weight: 800; letter-spacing: .04em;">
    Dearetna Blog Starter
  </h1>

  <p style="margin: 0 0 12px; font-size: 15px; max-width: 500px;">
    A modern and elegant finance-focused blog engine built using 
    <b>Laravel 12</b>, <b>React 19 + TypeScript</b>, <b>Inertia.js</b>, and <b>TailwindCSS</b>.
  </p>

  <p style="margin: 0 0 16px; font-size: 13px; opacity: .85;">
    Fully customizable. Clean. Ready for production.
  </p>

  <p>
    <img alt="Laravel" src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white">
    <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=0A1A2F">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
    <img alt="Inertia.js" src="https://img.shields.io/badge/Inertia.js-React-5A67D8?style=for-the-badge">
    <img alt="TailwindCSS" src="https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white">
  </p>

  <p style="margin-top: 12px; font-size: 11px; text-transform: uppercase; letter-spacing: .18em; opacity: .7;">
    Built for Dearetna — Reusable Blog Platform Template
  </p>

</div>


<!-- ============================================= -->
<!-- ================   FEATURES   ================ -->
<!-- ============================================= -->

<h2>✨ Features</h2>

<ul>
  <li>✔️ Fully modern <b>React 19 + TypeScript</b> frontend</li>
  <li>✔️ <b>Inertia.js</b> SPA experience powered by <b>Laravel 12</b></li>
  <li>✔️ Admin panel with CRUD:
    <ul>
      <li>Posts</li>
      <li>Categories</li>
      <li>Tags</li>
      <li>Admin profile</li>
    </ul>
  </li>
  <li>✔️ Beautiful WYSIWYG-like HTML editor (custom built)</li>
  <li>✔️ Image upload for thumbnails</li>
  <li>✔️ Dark & Light theme toggle (frontend)</li>
  <li>✔️ Public blog with:
    <ul>
      <li>Homepage</li>
      <li>Posts listing + search</li>
      <li>Article detail page</li>
      <li>About page</li>
    </ul>
  </li>
  <li>✔️ Authentication for admin only</li>
  <li>✔️ Slug auto-generation</li>
  <li>✔️ Smooth toast notifications</li>
  <li>✔️ Fully mobile responsive</li>
</ul>


<!-- ============================================= -->
<!-- ===========   INSTALLATION GUIDE   =========== -->
<!-- ============================================= -->

<h2>🚀 Installation Guide</h2>

<ol>
  <li><b>Clone the repository</b>
    <pre><code>git clone https://github.com/yourname/dearetna-blog-starter.git
cd dearetna-blog-starter</code></pre>
  </li>

  <li><b>Install backend dependencies</b>
    <pre><code>composer install</code></pre>
  </li>

  <li><b>Install frontend dependencies</b>
    <pre><code>npm install</code></pre>
  </li>

  <li><b>Copy environment file</b>
    <pre><code>cp .env.example .env</code></pre>
  </li>

  <li><b>Generate key</b>
    <pre><code>php artisan key:generate</code></pre>
  </li>

  <li><b>Setup database</b>
    <pre><code>php artisan migrate</code></pre>
  </li>

  <li><b>Link storage (IMPORTANT)</b>
    <pre><code>php artisan storage:link</code></pre>
  </li>
</ol>


<!-- ============================================= -->
<!-- ==============   CREATE ADMIN   =============== -->
<!-- ============================================= -->

<h2>👑 Creating Admin User (via Tinker)</h2>

<p>Open tinker:</p>
<pre><code>php artisan tinker</code></pre>

<p>Then run:</p>

<pre><code>
$user = new \App\Models\User;
$user->name = "Admin";
$user->email = "admin@example.com";
$user->password = bcrypt("password");
$user->is_admin = true;
$user->save();
</code></pre>

<p>Now you can log in at: <b>/admin/login</b></p>


<!-- ============================================= -->
<!-- ==============   START SERVER   ============== -->
<!-- ============================================= -->

<h2>🖥️ Running the Application</h2>

<p><b>Start Laravel backend:</b></p>
<pre><code>php artisan serve</code></pre>

<p><b>Start Vite frontend:</b></p>
<pre><code>npm run dev</code></pre>


<!-- ============================================= -->
<!-- ==============   PROJECT STRUCTURE   ========= -->
<!-- ============================================= -->

<h2>📁 Project Structure</h2>

<pre><code>
app/
 ├─ Http/
 │   ├─ Controllers/
 │   │   ├─ Admin/
 │   │   ├─ Front/
 │   │   └─ Auth/
resources/
 ├─ js/
 │   ├─ pages/
 │   ├─ components/
 │   ├─ hooks/
 │   └─ layouts/
public/
storage/
routes/
 ├─ web.php
 ├─ auth.php
</code></pre>


<!-- ============================================= -->
<!-- ==============   THEME SYSTEM   ============== -->
<!-- ============================================= -->

<h2>🌙 Theme System (Dark / Light)</h2>

<p>This project includes an elegant theme toggle using Tailwind + custom hook.</p>

<ul>
  <li>Theme persists using <code>localStorage</code></li>
  <li>Accessible anywhere in frontend</li>
  <li>Compatible with all pages and components</li>
</ul>


<!-- ============================================= -->
<!-- ==============   CREDITS   ============== -->
<!-- ============================================= -->

<h2>❤️ Credits</h2>

<ul>
  <li>Created for <b>Dearetna</b> — modern financial blog</li>
  <li>Built using Laravel, React, TypeScript, Tailwind, and Inertia</li>
</ul>

<br>

<div align="center" style="opacity:.6; font-size:12px;">
  © 2025 Dearetna Blog Starter — MIT License
</div>

