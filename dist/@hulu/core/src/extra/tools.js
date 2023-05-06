import { $log } from '../log.js';
import { prompts } from '../msc.js';
const isCancelPrompt = (prompt, message) => {
    if (prompts.isCancel(prompt)) {
        $log.end([message, '命令结束'].filter(Boolean));
        process.exit(1);
    }
};
