
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { Topic, Subtopic } from './Dashboard';

interface SubtopicListProps {
  topic: Topic;
  onSubtopicSelect: (subtopic: Subtopic) => void;
}

const SubtopicList = ({ topic, onSubtopicSelect }: SubtopicListProps) => {
  return (
    <div className="space-y-4">
      {topic.subtopics.map((subtopic) => (
        <motion.div
          key={subtopic.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="cursor-pointer"
          onClick={() => onSubtopicSelect(subtopic)}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow p-6 flex items-center justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{subtopic.title}</h3>
              <p className="text-sm text-gray-600">{subtopic.stories?.length || 0} stories</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SubtopicList;
