import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { UserDomain } from '@/types/user';
import {
    Code,
    DollarSign,
    Heart,
    GraduationCap,
    Palette,
    Briefcase,
    Check,
} from 'lucide-react';

interface DomainSelectorProps {
    selectedDomain?: UserDomain;
    onDomainSelect: (domain: UserDomain) => void;
}

const domains: {
    id: UserDomain;
    name: string;
    icon: React.ReactNode;
    description: string;
    color: string;
}[] = [
        {
            id: 'tech',
            name: 'Technology',
            icon: <Code className="w-6 h-6" />,
            description: 'Software, AI, Data Science',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            id: 'finance',
            name: 'Finance',
            icon: <DollarSign className="w-6 h-6" />,
            description: 'Banking, Investment, Analysis',
            color: 'from-green-500 to-emerald-500',
        },
        {
            id: 'health',
            name: 'Healthcare',
            icon: <Heart className="w-6 h-6" />,
            description: 'Medical, Wellness, Research',
            color: 'from-red-500 to-pink-500',
        },
        {
            id: 'education',
            name: 'Education',
            icon: <GraduationCap className="w-6 h-6" />,
            description: 'Teaching, Training, Academia',
            color: 'from-purple-500 to-violet-500',
        },
        {
            id: 'creative',
            name: 'Creative Arts',
            icon: <Palette className="w-6 h-6" />,
            description: 'Design, Media, Content',
            color: 'from-orange-500 to-yellow-500',
        },
        {
            id: 'business',
            name: 'Business',
            icon: <Briefcase className="w-6 h-6" />,
            description: 'Management, Consulting, Sales',
            color: 'from-indigo-500 to-blue-500',
        },
    ];

export function DomainSelector({ selectedDomain, onDomainSelect }: DomainSelectorProps) {
    return (
        <div className="space-y-4">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    Choose Your Domain
                </h3>
                <p className="text-muted-foreground">
                    Select your area of interest for personalized predictions
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {domains.map((domain, index) => {
                    const isSelected = selectedDomain === domain.id;

                    return (
                        <motion.div
                            key={domain.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card
                                className={`glass-card p-6 rounded-xl cursor-pointer transition-all hover:shadow-lg relative overflow-hidden ${isSelected ? 'ring-2 ring-primary shadow-lg' : ''
                                    }`}
                                onClick={() => onDomainSelect(domain.id)}
                            >
                                {/* Background Gradient */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-0 hover:opacity-10 transition-opacity`}
                                />

                                {/* Selected Indicator */}
                                {isSelected && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                                    >
                                        <Check className="w-4 h-4 text-primary-foreground" />
                                    </motion.div>
                                )}

                                {/* Content */}
                                <div className="relative z-10">
                                    <div
                                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${domain.color} flex items-center justify-center text-white mb-4`}
                                    >
                                        {domain.icon}
                                    </div>
                                    <h4 className="font-display font-semibold text-foreground mb-1">
                                        {domain.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">{domain.description}</p>
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
