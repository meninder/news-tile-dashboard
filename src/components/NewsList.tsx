
import { motion } from 'framer-motion';
import type { Story } from './Dashboard';

interface NewsListProps {
  stories: Story[];
}

const NewsList = ({ stories }: NewsListProps) => {
  return (
    <div className="space-y-6">
      {stories.map((story, index) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-lg shadow p-6 hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.title}</h3>
          <p className="text-gray-600 mb-4">{story.summary}</p>
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NewsList;
