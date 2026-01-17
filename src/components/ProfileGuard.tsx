import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { checkProfileExists } from '@/services/financialProfileApi';
import { Loader2 } from 'lucide-react';

interface ProfileGuardProps {
  children: React.ReactNode;
}

/**
 * ProfileGuard ensures users have completed their financial profile before accessing the home page
 * If no profile exists, redirects to /financial-profile
 */
export const ProfileGuard: React.FC<ProfileGuardProps> = ({ children }) => {
  const { user } = useAuth();
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const exists = await checkProfileExists(user);
        setHasProfile(exists);
      } catch (error) {
        console.error('Failed to check profile:', error);
        // If we can't check, assume no profile exists to be safe
        setHasProfile(false);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // If no profile exists, redirect to financial profile page
  if (!hasProfile) {
    return <Navigate to="/financial-profile" replace />;
  }

  return <>{children}</>;
};
