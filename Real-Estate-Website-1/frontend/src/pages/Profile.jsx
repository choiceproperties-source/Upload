import React, { useState, useEffect } from 'react';
import { Heart, FileText, CreditCard, Bell, LogOut } from 'lucide-react';
import { Backendurl } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageKitImage from '../components/ImageKitImage';
import { getThumbnailUrl } from '../utils/imagekitConfig';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [applications, setApplications] = useState([]);
  const [payments, setPayments] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        navigate('/login');
        return;
      }

      const [userRes, appsRes, paymentsRes] = await Promise.all([
        axios.get(`${Backendurl}/api/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => null),
        axios.get(`${Backendurl}/api/applications/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => null),
        axios.get(`${Backendurl}/api/payments/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => null)
      ]);

      if (userRes?.data) setUser(userRes.data.user);
      if (appsRes?.data) setApplications(appsRes.data.applications || []);
      if (paymentsRes?.data) setPayments(paymentsRes.data.payments || []);

      // Get favorites from localStorage
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(favs);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user?.firstName} {user?.lastName}</h1>
              <p className="text-gray-600 mt-2">{user?.email}</p>
              {user?.phone && <p className="text-gray-600">{user.phone}</p>}
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg flex items-center space-x-2 hover:bg-red-600"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4">
              <Heart className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-gray-600 text-sm">Favorites</p>
                <p className="text-2xl font-bold">{favorites.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4">
              <FileText className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-gray-600 text-sm">Applications</p>
                <p className="text-2xl font-bold">{applications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4">
              <CreditCard className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-gray-600 text-sm">Payments</p>
                <p className="text-2xl font-bold">{payments.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4">
              <Bell className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-gray-600 text-sm">Notifications</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 bg-white rounded-lg shadow p-4">
          {['overview', 'applications', 'payments', 'favorites'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Applications */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
              {applications.length === 0 ? (
                <p className="text-gray-600">No applications yet</p>
              ) : (
                <div className="space-y-4">
                  {applications.slice(0, 3).map(app => (
                    <div key={app._id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="font-semibold text-gray-900">{app.applicationId}</p>
                      <p className="text-sm text-gray-600">Status: <span className="font-medium">{app.status}</span></p>
                      <p className="text-sm text-gray-600">{new Date(app.submittedAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Payments */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h3>
              {payments.length === 0 ? (
                <p className="text-gray-600">No payments yet</p>
              ) : (
                <div className="space-y-4">
                  {payments.slice(0, 3).map(payment => (
                    <div key={payment._id} className="border-l-4 border-green-500 pl-4 py-2">
                      <p className="font-semibold text-gray-900">${payment.amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">TXN: {payment.transactionId.slice(0, 20)}...</p>
                      <p className="text-sm text-gray-600">{new Date(payment.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {applications.length === 0 ? (
              <div className="p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No applications submitted yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Employment</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Income</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(app => (
                      <tr key={app._id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-mono text-gray-900">{app.applicationId}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            app.status === 'approved' ? 'bg-green-100 text-green-800' :
                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            app.status === 'screening' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{app.employmentStatus}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">${app.annualIncome?.toLocaleString() || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(app.submittedAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {payments.length === 0 ? (
              <div className="p-8 text-center">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No payments made yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Transaction ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map(payment => (
                      <tr key={payment._id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-mono text-gray-900">{payment.transactionId.slice(0, 30)}...</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">${payment.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(payment.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.length === 0 ? (
              <div className="col-span-3 bg-white rounded-lg shadow p-8 text-center">
                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No favorites saved yet</p>
              </div>
            ) : (
              favorites.map(fav => (
                <div key={fav.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                  <ImageKitImage src={fav.image} alt={fav.title} width={300} height={200} className="w-full h-40" />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{fav.title}</h3>
                    <p className="text-sm text-gray-600">{fav.location}</p>
                    <p className="text-lg font-bold text-blue-500 mt-2">${fav.price}/mo</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
