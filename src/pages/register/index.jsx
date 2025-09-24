import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Briefcase, Chrome, Linkedin, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { Checkbox } from '../../components/ui/Checkbox';
import { cn } from '../../utils/cn';

const Register = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        jobTitle: '',
        industry: '',
        experienceLevel: '',
        agreeToTerms: false,
        agreeToPrivacy: false,
        emailVerified: false
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    
    // Industry options
    const industryOptions = [
        { value: 'technology', label: 'Technology' },
        { value: 'finance', label: 'Finance' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'education', label: 'Education' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Sales' },
        { value: 'consulting', label: 'Consulting' },
        { value: 'manufacturing', label: 'Manufacturing' },
        { value: 'retail', label: 'Retail' },
        { value: 'other', label: 'Other' }
    ];

    // Experience level options
    const experienceLevels = [
        { value: 'entry', label: 'Entry Level (0-2 years)' },
        { value: 'mid', label: 'Mid Level (3-5 years)' },
        { value: 'senior', label: 'Senior Level (6-10 years)' },
        { value: 'lead', label: 'Lead/Manager (10+ years)' }
    ];

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

    // Handle select changes
    const handleSelectChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors?.[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Password strength calculator
    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password?.length >= 8) strength++;
        if (/[A-Z]/?.test(password)) strength++;
        if (/[a-z]/?.test(password)) strength++;
        if (/[0-9]/?.test(password)) strength++;
        if (/[^A-Za-z0-9]/?.test(password)) strength++;
        
        return {
            score: strength,
            label: ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']?.[strength] || 'Very Weak'
        };
    };

    // Validate step 1
    const validateStep1 = () => {
        const newErrors = {};
        
        if (!formData?.fullName?.trim()) {
            newErrors.fullName = 'Full name is required';
        }
        
        if (!formData?.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData?.password) {
            newErrors.password = 'Password is required';
        } else if (formData?.password?.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        
        if (!formData?.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData?.password !== formData?.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors)?.length === 0;
    };

    // Validate step 2
    const validateStep2 = () => {
        const newErrors = {};
        
        if (!formData?.jobTitle?.trim()) {
            newErrors.jobTitle = 'Job title is required';
        }
        
        if (!formData?.industry) {
            newErrors.industry = 'Please select your industry';
        }
        
        if (!formData?.experienceLevel) {
            newErrors.experienceLevel = 'Please select your experience level';
        }
        
        if (!formData?.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the Terms of Service';
        }
        
        if (!formData?.agreeToPrivacy) {
            newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors)?.length === 0;
    };

    // Handle next step
    const handleNextStep = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2);
        }
    };

    // Handle previous step
    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e?.preventDefault();
        
        if (!validateStep2()) return;
        
        setLoading(true);
        setFeedback({ message: '', type: '' });
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Success - move to verification step
            setCurrentStep(3);
            setFeedback({
                message: 'Account created successfully! Please check your email for verification.',
                type: 'success'
            });
            
        } catch (error) {
            setFeedback({
                message: 'Registration failed. Please try again.',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    // Handle social registration
    const handleSocialRegister = (provider) => {
        setFeedback({
            message: `${provider} registration integration coming soon...`,
            type: 'info'
        });
    };

    // Handle email verification
    const handleResendVerification = () => {
        setFeedback({
            message: 'Verification email sent! Please check your inbox.',
            type: 'success'
        });
    };

    const passwordStrength = getPasswordStrength(formData?.password);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">H</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Huntly Today</h1>
                    <p className="text-gray-600">Start tracking your job applications and land your dream job</p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center mb-6">
                    {[1, 2, 3]?.map((step) => (
                        <React.Fragment key={step}>
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                                step <= currentStep ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                            )}>
                                {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
                            </div>
                            {step < 3 && (
                                <div className={cn(
                                    "h-1 w-8 mx-2",
                                    step < currentStep ? "bg-primary" : "bg-gray-200"
                                )} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Registration Form */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">Create Your Account</h2>
                                <p className="text-gray-600 mt-1">Let's get you started with the basics</p>
                            </div>

                            <form className="space-y-6">
                                {/* Full Name */}
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input
                                        type="text"
                                        name="fullName"
                                        placeholder="Enter your full name"
                                        value={formData?.fullName}
                                        onChange={handleInputChange}
                                        error={errors?.fullName}
                                        className="pl-11 h-12"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        value={formData?.email}
                                        onChange={handleInputChange}
                                        error={errors?.email}
                                        className="pl-11 h-12"
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Create a strong password"
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
                                    
                                    {/* Password Strength Indicator */}
                                    {formData?.password && (
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-gray-600">Password strength:</span>
                                                <span className={cn(
                                                    "font-medium",
                                                    passwordStrength?.score <= 2 && "text-red-500",
                                                    passwordStrength?.score === 3 && "text-yellow-500",
                                                    passwordStrength?.score >= 4 && "text-green-500"
                                                )}>
                                                    {passwordStrength?.label}
                                                </span>
                                            </div>
                                            <div className="flex space-x-1">
                                                {[1, 2, 3, 4, 5]?.map((i) => (
                                                    <div
                                                        key={i}
                                                        className={cn(
                                                            "h-1 flex-1 rounded",
                                                            i <= passwordStrength?.score
                                                                ? passwordStrength?.score <= 2
                                                                    ? "bg-red-500"
                                                                    : passwordStrength?.score === 3
                                                                    ? "bg-yellow-500" :"bg-green-500" :"bg-gray-200"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={formData?.confirmPassword}
                                        onChange={handleInputChange}
                                        error={errors?.confirmPassword}
                                        className="pl-11 pr-11 h-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>

                                {/* Next Button */}
                                <Button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="w-full h-12 text-base font-semibold"
                                >
                                    Continue
                                    <ChevronRight className="h-5 w-5 ml-2" />
                                </Button>

                                {/* Social Registration */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or register with</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-12"
                                        onClick={() => handleSocialRegister('Google')}
                                    >
                                        <Chrome className="h-5 w-5 mr-2" />
                                        Google
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-12"
                                        onClick={() => handleSocialRegister('LinkedIn')}
                                    >
                                        <Linkedin className="h-5 w-5 mr-2" />
                                        LinkedIn
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Step 2: Professional Information */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">Professional Details</h2>
                                <p className="text-gray-600 mt-1">Help us personalize your experience</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Job Title */}
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input
                                        type="text"
                                        name="jobTitle"
                                        placeholder="Enter your current job title"
                                        value={formData?.jobTitle}
                                        onChange={handleInputChange}
                                        error={errors?.jobTitle}
                                        className="pl-11 h-12"
                                        required
                                    />
                                </div>

                                {/* Industry */}
                                <Select
                                    options={industryOptions}
                                    value={formData?.industry}
                                    onChange={(value) => handleSelectChange('industry', value)}
                                    placeholder="Select your industry"
                                    error={errors?.industry}
                                    searchable
                                    required
                                />

                                {/* Experience Level */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-700">
                                        Experience Level <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {experienceLevels?.map((level) => (
                                            <label key={level?.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="experienceLevel"
                                                    value={level?.value}
                                                    checked={formData?.experienceLevel === level?.value}
                                                    onChange={handleInputChange}
                                                    className="h-4 w-4 text-primary focus:ring-primary"
                                                />
                                                <span className="text-sm font-medium text-gray-700">{level?.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors?.experienceLevel && (
                                        <p className="text-sm text-red-600">{errors?.experienceLevel}</p>
                                    )}
                                </div>

                                {/* Terms and Privacy */}
                                <div className="space-y-4">
                                    <Checkbox
                                        name="agreeToTerms"
                                        checked={formData?.agreeToTerms}
                                        onChange={handleInputChange}
                                        error={errors?.agreeToTerms}
                                        label={
                                            <span className="text-sm">
                                                I agree to the{' '}
                                                <a href="#" className="text-primary hover:underline font-medium">
                                                    Terms of Service
                                                </a>
                                            </span>
                                        }
                                        required
                                    />
                                    
                                    <Checkbox
                                        name="agreeToPrivacy"
                                        checked={formData?.agreeToPrivacy}
                                        onChange={handleInputChange}
                                        error={errors?.agreeToPrivacy}
                                        label={
                                            <span className="text-sm">
                                                I agree to the{' '}
                                                <a href="#" className="text-primary hover:underline font-medium">
                                                    Privacy Policy
                                                </a>
                                            </span>
                                        }
                                        required
                                    />
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

                                {/* Navigation Buttons */}
                                <div className="flex space-x-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handlePrevStep}
                                        className="flex-1 h-12"
                                    >
                                        <ChevronLeft className="h-5 w-5 mr-2" />
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 h-12 text-base font-semibold"
                                        loading={loading}
                                        disabled={loading}
                                    >
                                        {loading ? 'Creating Account...' : 'Create Account'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Step 3: Email Verification */}
                    {currentStep === 3 && (
                        <div className="text-center space-y-6">
                            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-green-500" />
                            </div>
                            
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">Verify Your Email</h2>
                                <p className="text-gray-600">
                                    We've sent a verification link to <strong>{formData?.email}</strong>. 
                                    Please check your inbox and click the link to complete your registration.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <Button
                                    onClick={handleResendVerification}
                                    variant="outline"
                                    className="w-full h-12"
                                >
                                    Resend Verification Email
                                </Button>
                                
                                <p className="text-sm text-gray-500">
                                    Didn't receive the email? Check your spam folder or contact support.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Login Prompt */}
                    {currentStep <= 2 && (
                        <div className="text-center pt-6 mt-6 border-t">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="font-semibold text-primary hover:text-primary/80"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    )}
                </div>

                {/* Security Notice */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        Your personal information is protected by industry-standard encryption
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;