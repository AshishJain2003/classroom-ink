import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, LogIn, UserPlus } from 'lucide-react';

const TeacherOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="outline" 
          className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Teacher Portal</h1>
          <p className="text-white/90">
            Sign in to your existing account or create a new one to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/95 backdrop-blur-sm shadow-hover border-0 hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => navigate('/teacher-login')}>
            <CardHeader>
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full">
                <LogIn className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-xl text-primary text-center">Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 text-center">
                Already have an account? Sign in to access your existing classrooms
              </p>
              <Button className="w-full bg-gradient-primary text-white border-0 hover:shadow-hover">
                Sign In to Account
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-hover border-0 hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => navigate('/teacher-signup')}>
            <CardHeader>
              <div className="mx-auto mb-4 p-4 bg-accent/10 rounded-full">
                <UserPlus className="h-12 w-12 text-accent" />
              </div>
              <CardTitle className="text-xl text-accent text-center">Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 text-center">
                New to VidyaVichar? Create your teacher account to start managing classrooms
              </p>
              <Button className="w-full bg-accent text-white border-0 hover:shadow-hover">
                Create New Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherOptions;