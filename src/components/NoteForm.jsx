import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NoteForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    question: '',
    color: 'yellow',
    category: 'general'
  });
  const [loading, setLoading] = useState(false);

  const colors = [
    { value: 'yellow', label: 'Yellow', class: 'bg-note-yellow' },
    { value: 'blue', label: 'Blue', class: 'bg-note-blue' },
    { value: 'green', label: 'Green', class: 'bg-note-green' },
    { value: 'orange', label: 'Orange', class: 'bg-note-orange' },
    { value: 'pink', label: 'Pink', class: 'bg-note-pink' },
    { value: 'purple', label: 'Purple', class: 'bg-note-purple' }
  ];

  const categories = [
    'general',
    'homework',
    'concept',
    'doubt',
    'suggestion'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.question.trim()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({
        studentName: '',
        question: '',
        color: 'yellow',
        category: 'general'
      });
    } catch (error) {
      console.error('Error submitting note:', error);
      throw error; // Re-throw to let parent handle it
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto shadow-card">
      <CardHeader>
        <CardTitle className="text-center text-primary">Add Your Question</CardTitle>
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
            <Label htmlFor="question">Your Question</Label>
            <Textarea
              id="question"
              value={formData.question}
              onChange={(e) => setFormData({...formData, question: e.target.value})}
              placeholder="What would you like to ask?"
              rows={4}
              required
            />
          </div>

          <div>
            <Label>Note Color</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {colors.map(color => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData({...formData, color: color.value})}
                  className={`p-3 rounded-lg border-2 transition-all ${color.class} ${
                    formData.color === color.value 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span className="text-sm font-medium">{color.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              disabled={loading || !formData.studentName.trim() || !formData.question.trim()}
              className="flex-1"
            >
              {loading ? 'Adding...' : 'Add Question'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NoteForm;