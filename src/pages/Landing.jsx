import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, PlusCircle } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">VidyaVichar</h1>
          <p className="text-xl text-white/90 mb-8">
            Interactive Classroom Questions - Connect Teachers and Students
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm shadow-hover border-0 hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => navigate('/teacher-options')}>
            <CardHeader>
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full">
                <PlusCircle className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl text-primary">Create Classroom</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Start a new classroom session and get a code to share with your students
              </p>
              <Button className="w-full bg-gradient-primary text-white border-0 hover:shadow-hover">
                Get Started as Teacher
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-hover border-0 hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => navigate('/student-join')}>
            <CardHeader>
              <div className="mx-auto mb-4 p-4 bg-accent/10 rounded-full">
                <Users className="h-12 w-12 text-accent" />
              </div>
              <CardTitle className="text-2xl text-accent">Join Classroom</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Enter the classroom code provided by your teacher to join the session
              </p>
              <Button className="w-full bg-accent text-white border-0 hover:shadow-hover">
                Join as Student
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-white/80">
          <p className="text-sm">
            A collaborative platform for interactive classroom questions and discussions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;