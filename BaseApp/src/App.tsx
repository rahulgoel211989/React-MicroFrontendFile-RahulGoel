import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from 'App1/Dashboard'
import List from 'App1/List'
import App2Dashboard from 'App2/App2Dashboard'
import './index.scss'

const App = () => (
  <div className="container">
    <header className='header'>
      Header
    </header>
    <BrowserRouter>
        <div className="app-container">
          <aside className="sidebar">
            <ul>
              <li><Link to="/">App 1</Link></li>
              <li><Link to="/app2">App 2</Link></li>
            </ul>
          </aside>
          <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/List" element={<List />} />
                <Route path="/app2" element={<App2Dashboard />} />
              </Routes>
          </main>
        </div>
      </BrowserRouter>
      <footer className='footer'>
        Footer
      </footer>
  </div>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)
