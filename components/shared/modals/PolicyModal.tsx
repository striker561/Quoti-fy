"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePolicyStore } from "@/stores/modal/usePolicyModalStore";

export default function PolicyModal() {
    const { hasAccepted, manualOpen, accept, close } = usePolicyStore();

    const isOpen = !hasAccepted || manualOpen;

    return (
    <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Privacy & Data Usage {hasAccepted && ('(Accepted)')}</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm p-3">
                    <p>1. We collect the mood text you enter and may save it in our database.</p>
                    <p>2. To personalize results, we use your location (from your IP address) and date in our prompts to chatgpt and gemini.</p>
                    <p>3. We send your input to OpenAI and Google Gemini to generate content.</p>
                    <p>4. We collect basic account details from GitHub or Google when you sign in.</p>
                    <p>5. Saved mood photos are stored on our cloud server for tracking and improving your experience.</p>
                    <p>6. You can delete your account and all saved data instantly.</p>
                    <p>7. The full source code is public and open for review.</p>
                    <p className="font-medium text-red-600">
                        If you do not agree, please do not use Quoti-fy.
                    </p>
                </div>
                <div className="flex justify-end mt-4">
                    {!hasAccepted ? (
                        <Button onClick={accept}>I Agree</Button>
                    ) : (
                        <Button onClick={close}>Close</Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
