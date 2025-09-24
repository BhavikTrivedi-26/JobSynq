import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterToolbar from './components/FilterToolbar';
import BulkActions from './components/BulkActions';
import ViewToggle from './components/ViewToggle';
import SortControls from './components/SortControls';
import ApplicationTable from './components/ApplicationTable';
import ApplicationCard from './components/ApplicationCard';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';

const Applications = () => {
  const navigate = useNavigate();
  
  // Mock data
  const mockApplications = [
    {
  id: 1,
  company: "Google",
  position: "Senior Software Engineer",
  location: "Bangalore, Karnataka",
  status: "Interview",
  salaryMin: 2500000,
  salaryMax: 3500000,
  applicationDate: "2025-01-15",
  platform: "LinkedIn India",
  jobDescription: `We are looking for a Senior Software Engineer to join our team and work on cutting-edge technologies.\n\nResponsibilities:\n• Design and develop scalable software solutions\n• Collaborate with cross-functional teams\n• Mentor junior developers`,
  notes: "Great company culture, exciting projects. Follow up scheduled for next week."
},
{
  id: 2,
  company: "Microsoft",
  position: "Product Manager",
  location: "Hyderabad, Telangana",
  status: "Applied",
  salaryMin: 2000000,
  salaryMax: 2800000,
  applicationDate: "2025-01-18",
  platform: "Company Website",
  jobDescription: `Join our product team to drive innovation and deliver exceptional user experiences.\n\nKey Requirements:\n• 5+ years of product management experience\n• Strong analytical and communication skills\n• Experience with agile methodologies`,
  notes: "Applied through company website. Waiting for initial response."
},
{
  id: 3,
  company: "Flipkart",
  position: "iOS Developer",
  location: "Bangalore, Karnataka",
  status: "Phone Screen",
  salaryMin: 1400000,
  salaryMax: 1800000,
  applicationDate: "2025-01-12",
  platform: "Naukri.com",
  jobDescription: `Develop innovative iOS applications that delight millions of users worldwide.\n\nRequirements:\n• Proficiency in Swift and Objective-C\n• Experience with iOS SDK and frameworks\n• Strong understanding of mobile app design principles`,
  notes: "Phone screen went well. Technical interview scheduled for next week."
},
{
  id: 4,
  company: "Amazon",
  position: "Data Scientist",
  location: "Bangalore, Karnataka",
  status: "Final Round",
  salaryMin: 1800000,
  salaryMax: 2500000,
  applicationDate: "2025-01-08",
  platform: "Indeed India",
  jobDescription: `Use data science and machine learning to solve complex business problems at scale.\n\nQualifications:\n• Master's in Computer Science, Statistics, or related field\n• Experience with Python, R, and SQL\n• Knowledge of machine learning algorithms`,
  notes: "Final round interview completed. Waiting for decision."
},
{
  id: 5,
  company: "Meta",
  position: "Frontend Engineer",
  location: "Gurgaon, Haryana",
  status: "Offer",
  salaryMin: 2200000,
  salaryMax: 3000000,
  applicationDate: "2025-01-05",
  platform: "LinkedIn India",
  jobDescription: `Build the next generation of social technology and create connections that matter.\n\nWhat you'll do:\n• Develop user-facing features using React and JavaScript\n• Optimize applications for maximum speed and scalability\n• Collaborate with designers and product managers`,
  notes: "Received offer! Negotiating salary and start date."
},
{
  id: 6,
  company: "Zomato",
  position: "DevOps Engineer",
  location: "Gurgaon, Haryana",
  status: "Rejected",
  salaryMin: 1200000,
  salaryMax: 1600000,
  applicationDate: "2025-01-20",
  platform: "Referral",
  jobDescription: `Help scale our infrastructure to serve millions of food lovers globally.\n\nResponsibilities:\n• Manage cloud infrastructure and deployment pipelines\n• Implement monitoring and alerting systems\n• Collaborate with development teams on CI/CD processes`,
  notes: "Unfortunately didn't move forward. Good learning experience."
},
{
  id: 7,
  company: "Uber",
  position: "Full Stack Developer",
  location: "Bangalore, Karnataka",
  status: "Applied",
  salaryMin: 1600000,
  salaryMax: 2200000,
  applicationDate: "2025-01-22",
  platform: "AngelList",
  jobDescription: `Join our mission to build mobility solutions through innovative software solutions.\n\nRequirements:\n• Experience with modern web technologies\n• Knowledge of both frontend and backend development\n• Passion for solving transportation challenges`,
  notes: "Excited about the mobility solutions. Application submitted yesterday."
},
{
  id: 8,
  company: "Razorpay",
  position: "Backend Engineer",
  location: "Bangalore, Karnataka",
  status: "Interview",
  salaryMin: 1300000,
  salaryMax: 1800000,
  applicationDate: "2025-01-14",
  platform: "Company Website",
  jobDescription: `Build the backend systems that power payments for millions of businesses.\n\nWhat we're looking for:\n• Strong experience with distributed systems\n• Proficiency in Java, Python, or Go\n• Experience with microservices architecture`,
  notes: "Technical interview scheduled for this Friday. Preparing system design questions."
},
{
  id: 9,
  company: "Netflix",
  position: "UX Designer",
  location: "Mumbai, Maharashtra",
  status: "Phone Screen",
  salaryMin: 1500000,
  salaryMax: 2000000,
  applicationDate: "2025-01-16",
  platform: "Indeed India",
  jobDescription: `Design experiences that help people discover and enjoy content.\n\nKey responsibilities:\n• Create user-centered design solutions\n• Collaborate with product and engineering teams\n• Conduct user research and usability testing`,
  notes: "Portfolio review went well. Next step is design challenge."
},
{
  id: 10,
  company: "Paytm",
  position: "Machine Learning Engineer",
  location: "Noida, Uttar Pradesh",
  status: "Applied",
  salaryMin: 1400000,
  salaryMax: 2000000,
  applicationDate: "2025-01-19",
  platform: "Naukri.com",
  jobDescription: `Apply machine learning to solve real-world fintech and payments challenges.\n\nRequirements:\n• Strong background in machine learning and statistics\n• Experience with TensorFlow or PyTorch\n• Knowledge of distributed computing frameworks`,
  notes: "Interesting role combining ML with fintech. Waiting for response."
}
  ];

  // State management
  const [applications, setApplications] = useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    company: '',
    status: [],
    platform: [],
    dateFrom: '',
    dateTo: ''
  });
  const [sortConfig, setSortConfig] = useState({
    field: 'applicationDate',
    direction: 'desc'
  });
  const [currentView, setCurrentView] = useState('table');
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    application: null,
    isBulk: false
  });

  // Filtered and sorted applications
  const filteredApplications = useMemo(() => {
    let filtered = applications?.filter(app => {
      // Search filter
      const searchMatch = !searchTerm || 
        app?.company?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        app?.position?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        app?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        app?.status?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        app?.platform?.toLowerCase()?.includes(searchTerm?.toLowerCase());

      // Company filter
      const companyMatch = !filters?.company || app?.company === filters?.company;

      // Status filter
      const statusMatch = filters?.status?.length === 0 || filters?.status?.includes(app?.status);

      // Platform filter
      const platformMatch = filters?.platform?.length === 0 || filters?.platform?.includes(app?.platform);

      // Date range filter
      const dateMatch = (!filters?.dateFrom || app?.applicationDate >= filters?.dateFrom) &&
                       (!filters?.dateTo || app?.applicationDate <= filters?.dateTo);

      return searchMatch && companyMatch && statusMatch && platformMatch && dateMatch;
    });

    // Sort applications
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.field];
      let bValue = b?.[sortConfig?.field];

      // Handle different data types
      if (sortConfig?.field === 'applicationDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (sortConfig?.field === 'salaryMin') {
        aValue = a?.salaryMin || 0;
        bValue = b?.salaryMin || 0;
      } else if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [applications, searchTerm, filters, sortConfig]);

  // Event handlers
  const handleSort = (field, direction = null) => {
    setSortConfig({
      field,
      direction: direction || (sortConfig?.field === field && sortConfig?.direction === 'asc' ? 'desc' : 'asc')
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedApplications(filteredApplications?.map(app => app?.id));
    } else {
      setSelectedApplications([]);
    }
  };

  const handleSelectApplication = (id, checked) => {
    if (checked) {
      setSelectedApplications(prev => [...prev, id]);
    } else {
      setSelectedApplications(prev => prev?.filter(appId => appId !== id));
    }
  };

  const handleEdit = (application) => {
    navigate('/add-application', { state: { editApplication: application } });
  };

  const handleDelete = (application) => {
    setDeleteModal({
      isOpen: true,
      application,
      isBulk: false
    });
  };

  const handleBulkDelete = () => {
    setDeleteModal({
      isOpen: true,
      application: null,
      isBulk: true
    });
  };

  const confirmDelete = () => {
    if (deleteModal?.isBulk) {
      setApplications(prev => prev?.filter(app => !selectedApplications?.includes(app?.id)));
      setSelectedApplications([]);
    } else {
      setApplications(prev => prev?.filter(app => app?.id !== deleteModal?.application?.id));
    }
    setDeleteModal({ isOpen: false, application: null, isBulk: false });
  };

  const handleStatusUpdate = (application) => {
    // In a real app, this would open a status update modal
    console.log('Status update for:', application);
  };

  const handleBulkStatusUpdate = (newStatus) => {
    setApplications(prev => prev?.map(app => 
      selectedApplications?.includes(app?.id) 
        ? { ...app, status: newStatus }
        : app
    ));
    setSelectedApplications([]);
  };

  const handleExport = (format) => {
    const selectedApps = applications?.filter(app => selectedApplications?.includes(app?.id));
    console.log(`Exporting ${selectedApps?.length} applications as ${format}`);
    // In a real app, this would trigger the actual export
  };

  const clearFilters = () => {
    setFilters({
      company: '',
      status: [],
      platform: [],
      dateFrom: '',
      dateTo: ''
    });
    setSearchTerm('');
  };

  const clearSelection = () => {
    setSelectedApplications([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Applications</h1>
            <p className="text-gray-600">
              Manage and track all your job applications in one place
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Link to="/add-application">
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
              >
                Add Application
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Toolbar */}
        <FilterToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
          resultCount={filteredApplications?.length}
        />

        {/* Bulk Actions */}
        <BulkActions
          selectedCount={selectedApplications?.length}
          onBulkStatusUpdate={handleBulkStatusUpdate}
          onBulkDelete={handleBulkDelete}
          onExportSelected={handleExport}
          onClearSelection={clearSelection}
        />

        {/* View Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <ViewToggle
              currentView={currentView}
              onViewChange={setCurrentView}
            />
            
            <div className="hidden sm:block h-6 w-px bg-gray-300" />
            
            <SortControls
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              onClick={() => handleExport('csv')}
              disabled={filteredApplications?.length === 0}
            >
              Export All
            </Button>
          </div>
        </div>

        {/* Applications Display */}
        {currentView === 'table' ? (
          <ApplicationTable
            applications={filteredApplications}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusUpdate={handleStatusUpdate}
            selectedApplications={selectedApplications}
            onSelectAll={handleSelectAll}
            onSelectApplication={handleSelectApplication}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApplications?.map(application => (
              <ApplicationCard
                key={application?.id}
                application={application}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusUpdate={handleStatusUpdate}
                isSelected={selectedApplications?.includes(application?.id)}
                onSelect={handleSelectApplication}
              />
            ))}
            
            {filteredApplications?.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Icon name="FileText" size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || Object.values(filters)?.some(f => f && (Array.isArray(f) ? f?.length > 0 : true))
                    ? 'Try adjusting your filters or search terms.' :'Get started by adding your first job application.'
                  }
                </p>
                <Link to="/add-application">
                  <Button
                    variant="default"
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add Your First Application
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={deleteModal?.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, application: null, isBulk: false })}
          onConfirm={confirmDelete}
          application={deleteModal?.application}
          isBulk={deleteModal?.isBulk}
          bulkCount={selectedApplications?.length}
        />
      </div>
    </div>
  );
};

export default Applications;