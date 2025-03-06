
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import type { Topic } from './Dashboard';

interface TopicGridProps {
  topics: Topic[];
  onTopicSelect: (topic: Topic) => void;
}

const TopicGrid = ({ topics, onTopicSelect }: TopicGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topics.map((topic) => {
        // Explicitly type the icon component
        const IconComponent = (Icons as Record<string, React.FC>)[topic.icon];
        
        return (
          <motion.div
            key={topic.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer"
            onClick={() => onTopicSelect(topic)}
          >
            <div className={`relative overflow-hidden rounded-xl shadow-lg backdrop-blur-sm bg-white/90 p-6 h-48 flex flex-col justify-between transition-all duration-300 hover:shadow-xl`}>
              <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-10">
                {IconComponent && <IconComponent />}
              </div>
              <div className="relative">
                <div className={`inline-flex items-center justify-center p-2 rounded-lg ${topic.color} bg-opacity-10`}>
                  {IconComponent && <IconComponent className={`w-6 h-6 ${topic.color.replace('bg-', 'text-')}`} />}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{topic.title}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  {topic.subtopics.length} subtopics
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TopicGrid;
