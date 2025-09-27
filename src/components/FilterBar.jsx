import { Button } from '@/components/ui/button';

const FilterBar = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-card rounded-lg shadow-card">
      <span className="text-sm font-medium text-muted-foreground mr-2 self-center">Filter by:</span>
      {categories.map(category => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className="capitalize"
        >
          {category === 'all' ? 'All Questions' : category}
        </Button>
      ))}
    </div>
  );
};

export default FilterBar;