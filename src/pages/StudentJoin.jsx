import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users } from 'lucide-react';
import { classroomAPI } from '../api/classroom';
import { useToast } from '@/hooks/use-toast';
import Loader from '../components/Loader';

const StudentJoin = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    classroomCode: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.classroomCode.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both your name and classroom code.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const result = await classroomAPI.joinClassroom(
        formData.classroomCode.toUpperCase(), 
        formData.studentName.trim()
      );
      
      toast({
        title: "Success!",
        description: `Welcome to ${result.classroom.name}!`
      });
      
      navigate('/classroom-view');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Joining classroom..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="max-w-md mx-auto">
        <Button 
          variant="outline" 
          className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Button>

        <Card className="bg-white/95 backdrop-blur-sm shadow-hover border-0">
          <CardHeader>
            <div className="mx-auto mb-4 p-4 bg-accent/10 rounded-full">
              <Users className="h-12 w-12 text-accent" />
            </div>
            <CardTitle className="text-2xl text-center text-accent">Join Classroom</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="studentName">Your Name</Label>
                <Input
                  id="studentName"
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="classroomCode">Classroom Code</Label>
                <Input
                  id="classroomCode"
                  type="text"
                  value={formData.classroomCode}
                  onChange={(e) => setFormData({...formData, classroomCode: e.target.value.toUpperCase()})}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-accent text-white border-0 hover:shadow-hover"
                disabled={loading}
              >
                {loading ? 'Joining...' : 'Join Classroom'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentJoin;