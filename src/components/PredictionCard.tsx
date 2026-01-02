import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PredictionScenario } from '@/types/strength';
import { TrendingUp, TrendingDown, Minus, Info, MoreVertical, Eye, Share2, Download, Copy } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface PredictionCardProps {
    title: string;
    scenarios: PredictionScenario[];
    icon?: React.ReactNode;
}

export function PredictionCard({ title, scenarios, icon }: PredictionCardProps) {
    const { toast } = useToast();

    const handleViewDetails = () => {
        toast({
            title: "Detailed Analysis",
            description: `Viewing detailed breakdown for ${title}`,
        });
    };

    const handleShare = () => {
        toast({
            title: "Share Prediction",
            description: `Sharing ${title} prediction...`,
        });
    };

    const handleExport = () => {
        const data = JSON.stringify({ title, scenarios }, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-prediction.json`;
        a.click();
        toast({
            title: "Export Successful",
            description: `${title} prediction exported`,
        });
    };

    const handleCopy = () => {
        const text = scenarios.map(s =>
            `${s.type.toUpperCase()}: ${s.percentage}% - ${s.description}`
        ).join('\n');
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied!",
            description: "Prediction data copied to clipboard",
        });
    };
    const getScenarioIcon = (type: string) => {
        switch (type) {
            case 'optimistic':
                return <TrendingUp className="w-4 h-4" />;
            case 'pessimistic':
                return <TrendingDown className="w-4 h-4" />;
            default:
                return <Minus className="w-4 h-4" />;
        }
    };

    const getScenarioColor = (type: string) => {
        switch (type) {
            case 'optimistic':
                return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'pessimistic':
                return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            default:
                return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
        }
    };

    const getProgressColor = (type: string) => {
        switch (type) {
            case 'optimistic':
                return 'bg-green-500';
            case 'pessimistic':
                return 'bg-orange-500';
            default:
                return 'bg-blue-500';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        {icon && <div className="text-primary">{icon}</div>}
                        <h3 className="text-xl font-display font-semibold text-foreground">{title}</h3>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleViewDetails}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleShare}>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share Prediction
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleExport}>
                                <Download className="mr-2 h-4 w-4" />
                                Export as JSON
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleCopy}>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy to Clipboard
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="space-y-6">
                    {scenarios.map((scenario, index) => (
                        <motion.div
                            key={scenario.type}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-3"
                        >
                            {/* Scenario Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={`p-2 rounded-lg ${getScenarioColor(scenario.type)}`}>
                                        {getScenarioIcon(scenario.type)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground capitalize">
                                            {scenario.type} Scenario
                                        </p>
                                        <p className="text-sm text-muted-foreground">{scenario.description}</p>
                                    </div>
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Info className="w-4 h-4 text-muted-foreground" />
                                        </TooltipTrigger>
                                        <TooltipContent className="max-w-xs">
                                            <p className="text-sm">
                                                Confidence: {scenario.confidence.toFixed(1)}%
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>

                            {/* Percentage Display */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Success Probability
                                    </span>
                                    <motion.span
                                        className="text-2xl font-bold text-foreground"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                                    >
                                        {scenario.percentage}%
                                    </motion.span>
                                </div>
                                <div className="relative">
                                    <Progress value={scenario.percentage} className="h-3" />
                                    <motion.div
                                        className={`absolute top-0 left-0 h-3 rounded-full ${getProgressColor(
                                            scenario.type
                                        )}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${scenario.percentage}%` }}
                                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                                    />
                                </div>
                            </div>

                            {/* Factors */}
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    Key Factors
                                </p>
                                <ul className="space-y-1">
                                    {scenario.factors.map((factor, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 + 0.4 + i * 0.05 }}
                                            className="text-sm text-muted-foreground flex items-start gap-2"
                                        >
                                            <span className="text-primary mt-1">•</span>
                                            <span>{factor}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            {index < scenarios.length - 1 && (
                                <div className="border-b border-border mt-4" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </Card>
        </motion.div>
    );
}
