import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Media from "./scenes/website/Media";
import Notice from "./scenes/website/Notice";
import Library from "./scenes/student-corner/Library";
import Attendance from "./scenes/student-corner/Attendance";
import Users from "./scenes/settings/Users";
import WebsiteSettings from "./scenes/settings/WebsiteSettings";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              
              {/* Website Routes */}
              <Route path="/website/notice" element={<Notice />} />
              <Route path="/website/content" element={<Media />} />
              <Route path="/website/media" element={<Media />} />
              <Route path="/website/services" element={<Media />} />
              <Route path="/website/courses" element={<Media />} />
              <Route path="/website/gallery" element={<Media />} />
              <Route path="/website/testimonials" element={<Media />} />
              <Route path="/website/faq" element={<FAQ />} />
              
              {/* Student Corner Routes */}
              <Route path="/student-corner/library" element={<Library />} />
              <Route path="/student-corner/students" element={<Library />} />
              <Route path="/student-corner/users" element={<Users />} />
              <Route path="/student-corner/id-card" element={<Library />} />
              <Route path="/student-corner/enrolments" element={<Library />} />
              <Route path="/student-corner/attendance" element={<Attendance />} />
              <Route path="/student-corner/fees" element={<Library />} />
              <Route path="/student-corner/batches" element={<Library />} />
              <Route path="/student-corner/certificate" element={<Library />} />
              <Route path="/student-corner/employee-cards" element={<Library />} />
              <Route path="/student-corner/enquiry-references" element={<Library />} />
              
              {/* Institute Management Routes */}
              <Route path="/institute/students" element={<Library />} />
              <Route path="/institute/id-card" element={<Library />} />
              <Route path="/institute/enrolments" element={<Library />} />
              <Route path="/institute/attendance" element={<Attendance />} />
              <Route path="/institute/fees" element={<Library />} />
              <Route path="/institute/batches" element={<Library />} />
              <Route path="/institute/certificate" element={<Library />} />
              <Route path="/institute/employee-cards" element={<Library />} />
              <Route path="/institute/enquiry-references" element={<Library />} />
              
              {/* Settings Routes */}
              <Route path="/settings/general" element={<WebsiteSettings />} />
              <Route path="/settings/website" element={<WebsiteSettings />} />
              <Route path="/settings/seo" element={<WebsiteSettings />} />
              <Route path="/settings/email" element={<WebsiteSettings />} />
              <Route path="/settings/subscription" element={<WebsiteSettings />} />
              <Route path="/settings/qr-codes" element={<WebsiteSettings />} />
              <Route path="/settings/ads" element={<WebsiteSettings />} />
              <Route path="/settings/users" element={<Users />} />
              
              {/* Legacy Routes */}
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
