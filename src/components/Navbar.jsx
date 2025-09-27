import { LogOut, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = ({ user, userType, onLogout, classroomInfo }) => {
  return (
    <nav className="bg-gradient-primary shadow-card border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-white" />
              <h1 className="text-xl font-bold text-white">VidyaVichar</h1>
            </div>
            {classroomInfo && (
              <div className="hidden md:flex items-center space-x-2 text-white/90">
                <span className="text-sm">•</span>
                <span className="text-sm font-medium">{classroomInfo.name}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  Code: {classroomInfo.code}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <Users size={16} />
              <span className="text-sm">
                {userType === 'teacher' ? `Teacher: ${user.name}` : `Student: ${user.name}`}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;