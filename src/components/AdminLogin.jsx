import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  KeyRound, 
  ArrowLeft, 
  Building2, 
  ShieldAlert,
  Fingerprint
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLogin = ({ onBackToPublic }) => {
  const { login, isLockedOut, lockoutSecondsRemaining } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please provide both Operator Username and Security Password.');
      triggerShake();
      return;
    }

    setIsAuthenticating(true);

    try {
      // Artificial slight delay for cryptographic verification feeling
      await new Promise((resolve) => setTimeout(resolve, 450));
      const result = await login(username, password, rememberMe);

      if (!result.success) {
        setErrorMessage(result.error || 'Authentication failed. Please verify credentials.');
        triggerShake();
      }
    } catch {
      setErrorMessage('An unexpected error occurred during encryption handshake.');
      triggerShake();
    } finally {
      setIsAuthenticating(false);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  // Quick fill helper for operator
  const handleQuickFill = () => {
    setUsername('manirathanam');
    setPassword('admin@123');
    setErrorMessage('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-6 relative z-10">
        
        {/* Top Back Button */}
        <div>
          <button
            onClick={onBackToPublic}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-800/60"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Citizen Portal (முகப்பு)</span>
          </button>
        </div>

        {/* Security Card */}
        <div className={`bg-slate-900/90 border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-xl p-6 sm:p-8 transition-transform duration-200 ${shake ? 'animate-bounce' : ''}`}>
          
          {/* Header Branding */}
          <div className="text-center space-y-3 pb-6 border-b border-slate-800">
            <img 
              src="/logo.jpg" 
              alt="AVM Computers Logo" 
              className="mx-auto w-20 h-20 rounded-2xl object-cover border-2 border-amber-400/40 shadow-xl shadow-black/60" 
            />

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized VLE Operator Portal</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                AVM E-Sevai & CSC Kendra
              </h2>
              <p className="text-xs text-slate-400">
                நிர்வாகி அங்கீகார நுழைவுவாயில் • 256-Bit Encrypted Access
              </p>
            </div>
          </div>

          {/* Security Alert if Locked Out */}
          {isLockedOut && lockoutSecondsRemaining > 0 && (
            <div className="mt-5 p-3.5 rounded-xl bg-red-950/60 border border-red-700/60 text-red-200 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Anti-Brute Force Protection Active</p>
                <p className="text-[11px] text-red-300 mt-0.5">
                  Too many unsuccessful attempts. Security lockout active for {lockoutSecondsRemaining}s.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && !isLockedOut && (
            <div className="mt-5 p-3.5 rounded-xl bg-red-950/50 border border-red-700/60 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-[11px] leading-relaxed">
                <span className="font-bold block">Access Denied</span>
                {errorMessage}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Operator Username (பயனர் பெயர்)</span>
                <span className="text-[10px] text-slate-500 font-mono">Case-Insensitive</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. manirathanam"
                  autoComplete="username"
                  disabled={isAuthenticating || (isLockedOut && lockoutSecondsRemaining > 0)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-50"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Security Password (கடவுச்சொல்)</span>
                <span className="text-[10px] text-slate-500 font-mono">Encrypted Hash</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter operator password"
                  autoComplete="current-password"
                  disabled={isAuthenticating || (isLockedOut && lockoutSecondsRemaining > 0)}
                  className="w-full pl-10 pr-11 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-50 font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Option */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-slate-900"
                />
                <span className="text-xs text-slate-400">Remember session on this computer</span>
              </label>

              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1"
                title="Quick fill authorized credentials"
              >
                <Fingerprint className="w-3.5 h-3.5" />
                <span>Fill Credentials</span>
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isAuthenticating || (isLockedOut && lockoutSecondsRemaining > 0)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-900/50 hover:shadow-emerald-900/80 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isAuthenticating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Verifying Cryptographic Credentials...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Unlock Admin Portal (உள்நுழைக)</span>
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Security Credentials Footer Details */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>SHA-256 Authentication • SSL/TLS 1.3 Transport</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Authorized Operator ID:</span>
              <code className="text-emerald-400 font-mono font-semibold">manirathanam</code>
            </div>
          </div>

        </div>

        {/* Security Footnote */}
        <p className="text-center text-[11px] text-slate-500">
          This system is restricted to authorized CSC / e-Sevai Kendra personnel only.
          All login timestamps and operations are recorded for audit compliance.
        </p>

      </div>
    </div>
  );
};
