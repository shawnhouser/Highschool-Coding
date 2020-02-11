// gcc work.m -lobjc -oWor -framework Cocoa
#include <Carbon/Carbon.h>
int main(int argc, char** argv){
	// coordinate at (10,10) on the screen
	CGEventRef event = CGEventCreate(NULL);
	CGPoint cursor = CGEventGetLocation(event);
	CFRelease(event);
	CGPoint pt;
	int movex = 0;
	int movey = 0;
	if(argv[1] && argv[2]){
		movex = atoi(argv[1]);
		movey = atoi(argv[2]);
	}
	// Set relative
	pt.x = cursor.x + movex;
	pt.y = cursor.y + movey;
	/*  Set absolute
		pt.x = movex;
		pt.y = movey;
	*/
	CGEventRef moveEvent = CGEventCreateMouseEvent(
	    NULL,               // NULL to create a new event
	    kCGEventMouseMoved, // what type of event (move)
	    pt,                 // screen coordinate for the event
	    kCGMouseButtonLeft  // irrelevant for a move event
	);

	// post the event and cleanup
	CGEventPost(kCGSessionEventTap, moveEvent);
	CFRelease(moveEvent);
}