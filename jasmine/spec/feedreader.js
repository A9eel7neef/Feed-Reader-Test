/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is our second test - a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('are with URLs', function() {

            //looping through the allFeeds content and checking it has valid URL
            allFeeds.forEach(function(feed) {

                let checkHttp = feed.url.includes("http"); //to check if the url is valid
                let checkCom = feed.url.includes(".com"); //to check if the url is valid
                expect(feed.url).toBeDefined(); //undefined check
                expect(checkHttp || checkCom).toBeTruthy(); //valid url check		
                expect(feed.url).not.toBeNull(); //null check	

            })

        })

        /* This is our third test - a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('are with names', function() {

            //looping through the allFeeds content and checking it has valid name
            allFeeds.forEach(function(feed) {

                let checkEmpty = feed.name.replace(/\s+/g, ''); //removing the empty spaces to validate empty string
                expect(feed.name).toBeDefined(); //undefined check
                expect(checkEmpty.length).toBeGreaterThan(0); //check the string that after removing spaces
                expect(feed.name).not.toBeNull(); //null check	

            })

        })

    });

    /* This is our second test suite - a test suite just contains
     * a related set of tests. This suite is all about the menu
     * properities in the page.
     */
    describe('The menu', function() {



        /* This is our first test - a test that ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', async function() {
            await sleep(600); // to make sure this test is done before the next one
            let bodyClass = $('body').attr('class'); //get the class name for the body	
            let menuShift = parseInt($('.slide-menu').css('transform').split(',')[4]); // get the transform attribute that decide if the menu is totally hidden or not
            expect(bodyClass).toEqual('menu-hidden'); //check class
            expect(menuShift).not.toBeGreaterThan(-192); //check transform attribute

        })

        /* This is our second test - a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('does hide or show when clicked', async function() {

            //this function is to memic the mouse click on the menu item
            let iconClick = function() {
                let menuIcon = $('.menu-icon-link');
                menuIcon.click();
            }

            //first click on the icon menu button (Opening it)
            iconClick();
            let menuShift = parseInt($('.slide-menu').css('transform').split(',')[4]); // get the transform attribute that decide if the menu is totally hidden or not
            expect(menuShift).toBeLessThan(0); //check position
            let bodyClass = $('body').attr('class'); //get the class name for the body	
            expect(bodyClass).not.toEqual('menu-hidden'); //check class
            await sleep(600);

            //second click on the icon menu button (hiding it)
            iconClick();
            menuShift = parseInt($('.slide-menu').css('transform').split(',')[4]); // get the transform attribute that decide if the menu is totally hidden or not
            bodyClass = $('body').attr('class'); //get the class name for the body	
            expect(bodyClass).toEqual('menu-hidden'); //check class
            expect(menuShift).toEqual(0); //check position

        })
    });

    /* This is our third test suite - a test suite just contains
     * a related set of tests. This suite is all about the initial entries
     * within the page.
     */
    describe('Initial Entries', function() {

        let feedCount = document.querySelector(".feed").childElementCount; //getting the initial entries count

        //this function will make sure that the asynchronous work has been completed before testing
        beforeEach(function(done) {
            setTimeout(function() {
                loadFeed(0);
                feedCount = document.querySelector(".feed").childElementCount; // updating the count after loading
                done();

            }, 2000);
        });

        /*  This is our first test - a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('contain at least one element', function(done) {
            expect(feedCount).toBeGreaterThan(0);
            done();
        })

    });
    /* This is our forth test suite - a test suite just contains
     * a related set of tests. This suite is all about testing
     * the different feed selection.
     */
    describe('New Feed Selection', function() {
        /* This is our first test - a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let feedHref1;
        let feedHref2;

        //this function will make sure that the asynchronous work has been completed before testing
        beforeEach(function(done) {

            setTimeout(function() {
                loadFeed(0);
                feedHref1 = document.querySelector(".feed").firstElementChild.href; //get the href of first element of .feed
                done();
            }, 1000);

            setTimeout(function() {
                loadFeed(1);
                feedHref2 = document.querySelector(".feed").firstElementChild.href; //get the href of first element of new .feed
                done();
            }, 1000);
        });
        /*  This is our first test - a test that ensures when the feed is changed
         *the loadFeed function works proprly and updates the page.
         */
        it('loads different content', function(done) {
            expect(feedHref1).not.toEqual(feedHref2);
            done();
        })
    });
}());

// sleep time expects milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}