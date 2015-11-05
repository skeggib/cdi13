<?php

namespace CDI13\DatabaseBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    public function getSubjectsAction() // TODO
    {
        return new Response("getSubjects");
    }

    public function getLinksAction() // TODO
    {
        return new Response("getLinks");
    }

    public function searchLinksAction() // TODO
    {
        return new Response("searchLinks");
    }

    public function addSubjectAction() // TODO
    {
        return new Response("addSubject");
    }

    public function addLinkAction() // TODO
    {
        return new Response("addLink");
    }
}
