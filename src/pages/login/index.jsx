import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Chrome, Linkedin } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { cn } from '../../utils/cn';

const Login = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e?.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear field-specific errors when user starts typing
        if (errors?.[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData?.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData?.password) {
            newErrors.password = 'Password is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors)?.length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e?.preventDefault();
        
        if (!validateForm()) return;
        
        setLoading(true);
        setFeedback({ message: '', type: '' });
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success feedback
            setFeedback({
                message: 'Login successful! Redirecting to dashboard...',
                type: 'success'
            });
            
            // Navigate to dashboard after successful login
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
            
            // Reset form after successful login
            setTimeout(() => {
                setFormData({
                    email: '',
                    password: '',
                    rememberMe: false
                });
            }, 1000);
            
        } catch (error) {
            setFeedback({
                message: 'Invalid credentials. Please try again.',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    // Handle social login
    const handleSocialLogin = (provider) => {
        setFeedback({
            message: `${provider} login integration coming soon...`,
            type: 'info'
        });
    };

    // Handle forgot password
    const handleForgotPassword = () => {
        setFeedback({
            message: 'Password reset instructions sent to your email.',
            type: 'info'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">H</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back to Huntly</h1>
                    <p className="text-gray-600">Track your job applications with ease</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData?.email}
                                    onChange={handleInputChange}
                                    error={errors?.email}
                                    className="pl-11 h-12"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData?.password}
                                    onChange={handleInputChange}
                                    error={errors?.password}
                                    className="pl-11 pr-11 h-12"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <Checkbox
                                name="rememberMe"
                                checked={formData?.rememberMe}
                                onChange={handleInputChange}
                                label="Remember me"
                                className="text-sm"
                            />
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-sm text-primary hover:text-primary/80 font-medium"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Feedback Messages */}
                        {feedback?.message && (
                            <div className={cn(
                                "p-3 rounded-md text-sm",
                                feedback?.type === 'success' && "bg-green-50 text-green-700 border border-green-200",
                                feedback?.type === 'error' && "bg-red-50 text-red-700 border border-red-200",
                                feedback?.type === 'info' && "bg-blue-50 text-blue-700 border border-blue-200"
                            )}>
                                {feedback?.message}
                            </div>
                        )}

                        {/* Sign In Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold"
                            loading={loading}
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login Options */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-12"
                                onClick={() => handleSocialLogin('Google')}
                            >
                                <Chrome className="h-5 w-5 mr-2" />
                                Google
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-12"
                                onClick={() => handleSocialLogin('LinkedIn')}
                            >
                                <Linkedin className="h-5 w-5 mr-2" />
                                LinkedIn
                            </Button>
                        </div>

                        {/* Registration Prompt */}
                        <div className="text-center pt-4">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link
                                    to="/register"
                                    className="font-semibold text-primary hover:text-primary/80"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Security Notice */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        Protected by industry-standard security measures
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;